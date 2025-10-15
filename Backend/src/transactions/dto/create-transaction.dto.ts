import { IsNotEmpty, IsNumber, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  userId: string;

  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
//TODO: add validation for amount, category, description