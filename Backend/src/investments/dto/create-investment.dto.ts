import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreateInvestmentDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
