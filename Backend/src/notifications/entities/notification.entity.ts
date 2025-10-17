import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Entity } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.notifications, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({ default: 'general' })
    type: string; // bills, goals, investments, insights, etc.

    @Column({default: false})
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;
}