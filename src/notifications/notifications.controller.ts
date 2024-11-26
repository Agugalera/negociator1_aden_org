import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReadNotificationDto } from './dto/read-notification.dto';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('/friends/:id')
  findAllByGroup(@Param('id') id: string) {
    return this.notificationsService.findAllByGroup(+id);
  }

  @Get('userid/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.notificationsService.findAllByUserId(+id);
  }

  @Post('/read')
  read(@Body() readNotificationDto: ReadNotificationDto) {
    return this.notificationsService.read(readNotificationDto);
  }

  @Get('/chat/user/:id_author/:target_id')
  getUserNotificationByParticipant(@Param('id_author') id_author: string, @Param('target_id') target_id: string) {
    return this.notificationsService.getUserNotificationByParticipant(+id_author, +target_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
