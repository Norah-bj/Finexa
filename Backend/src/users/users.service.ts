import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
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
      email: user.email
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
}
