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

  // ✅ Create a notification for a user
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

  // ✅ Get all notifications for a specific user
  async findAll(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ Mark a specific notification as read
  async markAsRead(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');

    notification.isRead = true;
    return this.notificationRepo.save(notification);
  }

  // ✅ Delete a notification
  async deleteNotif(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');

    await this.notificationRepo.remove(notification);
    return { message: 'Notification deleted successfully' };
  }

  // ✅ Get a user's notification preferences
    async getPreferences(userId: string): Promise<NotificationPreference | { message: string }> {
    const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['notificationPreference'],
    });
    if (!user) throw new NotFoundException('User not found');

    const pref = user.notificationPreference;
    return pref ?? { message: 'No preferences set yet' };
    }


  // ✅ Update or create a user's notification preferences
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
        // Create new preference if it doesn't exist
        preference = this.notificationPrefRepo.create({
        ...body,
        user,
        });
    } else {
        // Update existing preference
        Object.assign(preference, body);
    }

    // Save and return — now preference is guaranteed non-null
    return await this.notificationPrefRepo.save(preference);
    }


}
// ✅ Get the count of unread notifications for a specific user