import { User } from "src/users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class NotificationPreference {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'light' })
    theme: string; // 'light' | 'dark' | 'auto'

    @Column({default: true})
    pushNotifications: boolean;
    
    @Column({default: true})
    emailAlerts: boolean;

    @Column({default: false})
    smsAlerts: boolean;

    @OneToOne(() => User, user => user.notificationPreference, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

}