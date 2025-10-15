import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  // Create a new goal for a specific user
  @Post(':userId')
  async create(@Param('userId') userId: string, @Body() dto: CreateGoalDto) {
    return this.savingsService.create(dto, userId);
  }

  // Get all goals for a specific user
  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return this.savingsService.findAll(userId);
  }

  // Get a single goal by ID
  @Get('goal/:id')
  async findOne(@Param('id') id: string) {
    return this.savingsService.findOne(id);
  }

  // Update a goal by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    return this.savingsService.update(id, dto);
  }

  // Delete a goal by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.savingsService.remove(id);
  }

  // Get savings recommendations for a specific user
  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string) {
    return this.savingsService.getRecommendations(userId);
  }
}
