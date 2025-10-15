import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto, user: User) {
    const tx = this.txRepo.create({
      user,
      type: dto.type,
      amount: dto.amount,
      category: dto.category,
      description: dto.description,
    });
    return this.txRepo.save(tx);
  }

  async findAll() {
    return this.txRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findAllForUser(userId: string) {
    return this.txRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getTotals(userId: string) {
    const transactions = await this.findAllForUser(userId);
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { income, expenses, net: income - expenses };
  }
}
