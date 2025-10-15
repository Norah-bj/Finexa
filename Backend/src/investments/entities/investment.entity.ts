import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productName: string;

  @Column()
  riskProfile: string;

  @Column('decimal', { precision: 12, scale: 2 })
  investedAmount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  currentValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
