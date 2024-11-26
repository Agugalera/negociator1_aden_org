import { Module } from '@nestjs/common';
import { NotificationUserService } from './notification_user.service';
import { NotificationUserController } from './notification_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationUser } from './entities/notification_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationUser])],
  controllers: [NotificationUserController],
  providers: [NotificationUserService],
  exports: [NotificationUserService]
})
export class NotificationUserModule {}
