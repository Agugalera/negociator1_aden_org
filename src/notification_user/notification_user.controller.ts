import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationUserService } from './notification_user.service';
import { CreateNotificationUserDto } from './dto/create-notification_user.dto';
import { UpdateNotificationUserDto } from './dto/update-notification_user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notification-user')
@ApiTags('notification-user')
export class NotificationUserController {
  constructor(private readonly notificationUserService: NotificationUserService) {}

  @Post()
  create(@Body() createNotificationUserDto: CreateNotificationUserDto) {
    return this.notificationUserService.create(createNotificationUserDto);
  }

  @Get()
  findAll() {
    return this.notificationUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationUserDto: UpdateNotificationUserDto) {
    return this.notificationUserService.update(+id, updateNotificationUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationUserService.remove(+id);
  }
}
