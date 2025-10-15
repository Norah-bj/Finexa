import { Controller, Get, Post, Patch, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
// TODO: Create CreateProductDto for better validation
// import { CreateProductDto } from './dto/create-product.dto';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly service: InvestmentsService) {}

  @Post(':userId')
  async create(@Param('userId') userId: string, @Body() dto: CreateInvestmentDto) {
    return this.service.create(userId, dto);
  }

  @Get('user/:userId')
  async userInvestments(@Param('userId') userId: string) {
    return this.service.findUserInvestments(userId);
  }

  @Get('overview/:userId')
  async overview(@Param('userId') userId: string) {
    return this.service.overview(userId);
  }

  @Get('risk-profiles')
  async riskProfiles() {
    return this.service.findRiskProfiles();
  }

  @Get('recommendations')
  async recommendations(@Query('profile') profile: string) {
    return this.service.recommendations(profile);
  }

  @Patch(':investmentId')
  async updateValue(@Param('investmentId') id: string, @Body() dto: UpdateInvestmentDto) {
    return this.service.updateValue(id, dto);
  }
}