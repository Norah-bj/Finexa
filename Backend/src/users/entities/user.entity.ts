import { NotificationPreference } from 'src/notifications/entities/notification-preference.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'decimal', nullable: true })
  monthlyBudget: number;

  @OneToOne(() => NotificationPreference, pref => pref.user)
  notificationPreference: NotificationPreference;

  @OneToMany(() => Notification, notif => notif.user)
  notifications: Notification[];


  @CreateDateColumn()
  createdAt: Date;
}
