import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlocksService } from 'src/blocks/blocks.service';
import { GroupsisService } from 'src/groupsis/groupsis.service';
import { NotificationUser } from 'src/notification_user/entities/notification_user.entity';
import { NotificationUserService } from 'src/notification_user/notification_user.service';
import { StudentGroupService } from 'src/student_group/student_group.service';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly studentGroupService: StudentGroupService,
    private readonly groupsisService: GroupsisService,
    private readonly notificationUserService: NotificationUserService,
    private readonly blocksService: BlocksService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification[]> {
    let notifications = []
    for (const recipient of createNotificationDto.recipients) {
      createNotificationDto.target_type = recipient.type;
      createNotificationDto.target_id = recipient.id;
      const newNotification = await this.notificationRepository.create(
        createNotificationDto,
      );
      await this.notificationRepository.save(newNotification);
      notifications.push(newNotification);
    }
    return notifications;
  }

  async read(readNotificationDto: ReadNotificationDto): Promise<NotificationUser> {
    const updatedNotification = await this.notificationUserService.create({
      id_notification:1,
      id_user: 1,
      readed: 1,
      readed_date: new Date(),
    });

    return updatedNotification;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find();
    return notifications;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllByGroup(id:number) {
    const group = await this.groupsisService.findOne(id);
    const groupsis = await this.groupsisService.findAllByBlock(group.id_block);
    for (const gr of groupsis) {
      const students = await this.studentGroupService.findAllByIdGroup(gr.id)
      gr['students'] = students
      // const group_sis = await this.groupsisService.findOne(group.id_group);
    }
    group['groups'] = groupsis;
    return [group];
  }

  async findAllByUserId(id:number) {
    const student_groups = await this.studentGroupService.findAllByUser(id)
    let notificaciones = []
    student_groups[0]
    for (const student_group of student_groups) {
      const target_id = student_group.id_group
      const notifications = await this.notificationRepository.find({where: {target_type: 'group', target_id: target_id}})
      if (notifications.length > 0) {
        notificaciones.push(...notifications)
      }
      const groupsis = await this.groupsisService.findOne(student_group.id_group)
      const blockNotifications = await this.notificationRepository.find({where: {target_type: 'block', target_id: groupsis.id_block}})
      if (blockNotifications.length > 0) {
        notificaciones.push(...blockNotifications)
      }
      const block = await this.blocksService.findOne(groupsis.id_block)
      const sessionNotifications = await this.notificationRepository.find({where: {target_type: 'session', target_id: block.id_session}})
      if (sessionNotifications.length > 0) {
        notificaciones.push(sessionNotifications)
      }
    }
    const notifications = notificaciones.slice(-10)
    const userNotifications = await this.notificationUserService.findAllByUser(id)
    let read = []
    for(const userNotification of userNotifications) {
      read.push(userNotification.id_notification)
    }
    for (const notification of notifications) {
      if (read.includes(notification.id)) {
        notification.readed = true
      }
      else{
        notification.readed = false
      }
    }
    return notifications;
  }

  async getUserNotificationByParticipant(id_author:number, target_id:number): Promise<Notification[]>{
    const notifications = await this.notificationRepository.find({where: {id_author: id_author, target_id: target_id, type: "chat"}});
    return notifications;
  }

  async findOne(id: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id: id },
    });
    if (notification) {
      return notification;
    }
    throw new NotFoundException(
      `Notification with this id: ${id} does not exist`,
    );
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepository.findOne(id);
    if (!notification) {
      throw new NotFoundException(
        `Notification with this id: ${id} does not exist`,
      );
    }
    notification.state = updateNotificationDto.state;

    const updatedNotification = await this.notificationRepository.save(
      notification,
    );

    return updatedNotification;
  }
  /**
   * A method that deletes a notification from the database
   * @param id An id of a notification. A notification with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.notificationRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `Notification with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
