import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';


@Controller('notifications')
export class NotificationsController {
    constructor(private readonly service: NotificationsService){}

    @Post()
    create(@Body() dto: CreateNotificationDto){
        return this.service.createNotif(dto);
    }

    @Get(':userId')
    findAll(@Param('userId') userId: string){
        return this.service.findAll(userId)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() dto: UpdateNotificationDto){
        return this.service.markAsRead(id)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.service.deleteNotif(id)
    }
}
