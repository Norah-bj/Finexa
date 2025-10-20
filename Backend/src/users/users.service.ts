import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SavingsService } from 'src/savings/savings.service';
import { InvestmentsService } from 'src/investments/investments.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly savingsService: SavingsService,
    private readonly investmentsService: InvestmentsService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<{ id: string; fullName: string; age: number; email: string}> {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);

    try {
      const user = this.usersRepo.create({
        fullName: dto.fullName,
        age: dto.age,
        email: dto.email,
        password: hashed,
      });

      await this.usersRepo.save(user)

      return {
        id: user.id,
        fullName: user.fullName,
        age: user.age,
        email: user.email
      } ;

    } catch (error) {
      console.log(error.message);
      return error.message; 
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findByEmail(email: string): Promise<User> {
    // return this.usersRepo.findOne({ where: { email } }); 
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new ConflictException('User not found');
    return user;
  }

  async getUserProfile(userId: string){
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new ConflictException('User not found');

    return {
      id: user.id,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      budget: user.monthlyBudget
    }
  }

  async updateUserProfile(userId: string, dto: CreateUserDto){  //use UpdateUserDto
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new ConflictException('User not found');

    // const hashed = await bcrypt.hash(dto.password, 10);

    user.fullName = dto.fullName;
    user.age = dto.age;
    user.email = dto.email;
    // user.password = hashed;
    await this.usersRepo.save(user);
    return {message: 'Profile updated successfully'}
  }

    async getFinancialSummary(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Fetch data from other modules
    const savings = await this.savingsService.findAll(userId);
    const investments = await this.investmentsService.findUserInvestments(userId);
    const value = await this.investmentsService.overview(userId);

    return {
      activeGoals: savings.activeGoals,
      totalSaved: savings.totalSaved,
      savingsRate: savings.overallProgress,
      totalInvestments: value.totalInvested,
      monthsActive: this.getMonthsSince(user.createdAt),
      budget: user.monthlyBudget,
      savingsGoal: savings.totalTarget,
      financialGoals: savings.goals.map(g => g.title),
    };
  }

  private getMonthsSince(date: Date): number {
    const now = new Date();
    const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    return months > 0 ? months : 0;
  }
}
