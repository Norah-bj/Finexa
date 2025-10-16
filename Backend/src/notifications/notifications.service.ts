import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateInvestmentDto } from 'src/investments/dto/update-investment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,

        @InjectRepository(User)
        private userRepo: Repository<User>,
    ){}

    async createNotif(dto: CreateNotificationDto){
        const user = await this.userRepo.findOne({where: {id:dto.userId}})
        if (!user) throw new NotFoundException('User not found')
        
        const notification = this.notificationRepo.create({
            ...dto,
            user,
            type: dto.type || 'general',
        });

        return this.notificationRepo.save(notification);
    }

    async findAll(userId: string){
        return this.notificationRepo.find({
            where: {user: {id: userId}},
            order: {createdAt: 'DESC'},
        })
    }

    async markAsRead(id: string){
        const notification = await this.notificationRepo.findOne({where: {id}});
        if (!notification) throw new NotFoundException('Notification not found');

        notification.isRead = true;
        return this.notificationRepo.save(notification);
    }

    async deleteNotif(id: string){
        const notification = await this.notificationRepo.findOne({where: {id}});
        if (!notification) throw new NotFoundException('Notification not found');

        await this.notificationRepo.remove(notification);
        return {message: 'Notification deleted successfully'}
    }
}
