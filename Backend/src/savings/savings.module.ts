import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsService } from './savings.service';
import { SavingsController } from './savings.controller';
import { Goal } from './entities/goal.entity';
import { User } from '../users/entities/user.entity'; // <-- import User entity

@Module({
  imports: [TypeOrmModule.forFeature([Goal, User])], // <-- add User here
  controllers: [SavingsController],
  providers: [SavingsService],
})
export class SavingsModule {}
