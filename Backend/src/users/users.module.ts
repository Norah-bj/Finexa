import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SavingsModule } from 'src/savings/savings.module';
import { InvestmentsModule } from 'src/investments/investments.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  SavingsModule,
  InvestmentsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
