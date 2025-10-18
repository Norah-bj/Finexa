import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,

    @InjectRepository(NotificationPreference)
    private readonly notificationPrefRepo: Repository<NotificationPreference>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createNotif(dto: CreateNotificationDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const notification = this.notificationRepo.create({
      ...dto,
      user,
      type: dto.type || 'general',
    });

    return this.notificationRepo.save(notification);
  }

  async findAll(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');

    notification.isRead = true;
    return this.notificationRepo.save(notification);
  }

  async deleteNotif(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');

    await this.notificationRepo.remove(notification);
    return { message: 'Notification deleted successfully' };
  }

    async getPreferences(userId: string): Promise<NotificationPreference | { message: string }> {
    const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['notificationPreference'],
    });
    if (!user) throw new NotFoundException('User not found');

    const pref = user.notificationPreference;
    return pref ?? { message: 'No preferences set yet' };
    }


    async updatePreferences(userId: string, body: Partial<NotificationPreference>): Promise<NotificationPreference> {
    const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['notificationPreference'],
    });
    if (!user) throw new NotFoundException('User not found');

    let preference = await this.notificationPrefRepo.findOne({
        where: { user: { id: userId } },
    });

    if (!preference) {
        preference = this.notificationPrefRepo.create({
        ...body,
        user,
        });
    } else {
        Object.assign(preference, body);
    }

    return await this.notificationPrefRepo.save(preference);
    }
}