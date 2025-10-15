import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Reference to the user
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column()
  category: string; // e.g., Security, Technology, Travel

  @Column()
  priority: string; // High / Medium / Low

  @Column('decimal')
  targetAmount: number;

  @Column('decimal', { default: 0 })
  currentAmount: number;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
