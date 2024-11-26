import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationUserDto } from './dto/create-notification_user.dto';
import { UpdateNotificationUserDto } from './dto/update-notification_user.dto';
import { NotificationUser } from './entities/notification_user.entity';

@Injectable()
export class NotificationUserService {
  constructor(
    @InjectRepository(NotificationUser)
    private createNotificationUserDto: Repository<NotificationUser>,
  ) {}

  async create(createNotificationUserDto: CreateNotificationUserDto) {
    const newNotificationUser = await this.createNotificationUserDto.create(
      createNotificationUserDto,
    );
    await this.createNotificationUserDto.save(newNotificationUser);
    return newNotificationUser;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<NotificationUser[]> {
    const notificationUsers = await this.createNotificationUserDto.find({
      order: { id: 'ASC' },
    });
    return notificationUsers;
  }

  async findAllByUser(id_user: number): Promise<NotificationUser[]> {
    const notificationUsers = await this.createNotificationUserDto.find({
      order: { id: 'ASC' },
      where: { id_user: id_user}
    });
    return notificationUsers;
  }

  async findOne(id: number) {
    const notificationUser = await this.createNotificationUserDto.findOne({
      where: { id: id },
    });
    if (notificationUser) {
      return notificationUser;
    }
    throw new NotFoundException(
      `NotificationUser with this id: ${id} does not exist`,
    );
  }

  async update(
    id: number,
    updateNotificationUserDto: UpdateNotificationUserDto,
  ) {
    const notificationUser = await this.createNotificationUserDto.findOne(id, {
    });
    if (!notificationUser) {
      throw new NotFoundException(
        `NotificationUser with this id: ${id} does not exist`,
      );
    }
    notificationUser.readed = updateNotificationUserDto.readed;

    const updatedNotificationUser = await this.createNotificationUserDto.save(
      notificationUser,
    );

    return updatedNotificationUser;
  }
  /**
   * A method that deletes a notificationUser from the database
   * @param id An id of a notificationUser. A notificationUser with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.createNotificationUserDto.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `NotificationUser with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
