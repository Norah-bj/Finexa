import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  priority: string;

  @IsNumber()
  targetAmount: number;

  @IsOptional()
  @IsNumber()
  currentAmount?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
