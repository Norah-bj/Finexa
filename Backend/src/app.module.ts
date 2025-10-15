import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SavingsModule } from './savings/savings.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { UsersModule } from './users/users.module';
import { getTypeOrmConfig } from './config/ormconfig';
import { InvestmentsModule } from './investments/investments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService), // ✅ pass configService here
    }),
    AuthModule,
    TransactionsModule,
    SavingsModule,
    UsersModule,
    InvestmentsModule,
  ],
  controllers: [AppController, ReportsController], // only controllers not provided by modules
  providers: [AppService, ReportsService],        // only providers not provided by modules
})
export class AppModule {}
