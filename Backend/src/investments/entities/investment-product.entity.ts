import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('investment_products')
export class InvestmentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  riskProfile: string;

  @Column('decimal', { precision: 5, scale: 2 })
  expectedReturn: number;

  @Column('decimal', { precision: 12, scale: 2 })
  minimumAmount: number;

  @Column()
  category: string;
}
