import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInvestmentDto {
  @IsNumber()
  @IsOptional()
  currentValue?: number;
}
