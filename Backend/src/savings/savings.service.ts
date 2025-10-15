import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SavingsService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // <-- needed to find the user
  ) {}

  async create(dto: CreateGoalDto, userId: string): Promise<Goal> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const goal = this.goalRepository.create({ ...dto, user });
    return this.goalRepository.save(goal);
  }

  async findAll(userId: string): Promise<any> {
    const goals = await this.goalRepository.find({
      where: { user: { id: userId } }, // <-- query by relation
    });

    const totalSaved = goals.reduce((sum, g) => sum + Number(g.currentAmount), 0);
    const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount), 0);
    const progress = totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0;

    return {
      overallProgress: progress,
      totalSaved,
      activeGoals: goals.length,
      goals,
    };
  }

  async findOne(id: string): Promise<Goal> {
    const goal = await this.goalRepository.findOne({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async update(id: string, dto: UpdateGoalDto): Promise<Goal> {
    await this.goalRepository.update(id, dto);
    const updated = await this.goalRepository.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Goal not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const goal = await this.goalRepository.findOne({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');
    await this.goalRepository.delete(id);
    return { message: 'Goal deleted successfully' };
  }

  async getRecommendations(userId: string): Promise<any> {
    const goals = await this.goalRepository.find({
      where: { user: { id: userId } },
    });

    const tips: any = [];
    if (goals.some((g) => g.priority === 'High' && g.currentAmount < g.targetAmount / 2)) {
      tips.push({
        message: 'Automate weekly transfers to boost your high-priority goals.',
      });
    }

    tips.push({
      message: 'Reduce unnecessary expenses to increase savings by 5%.',
    });

    return { tips };
  }
}
