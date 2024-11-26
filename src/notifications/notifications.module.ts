import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { GroupsisModule } from 'src/groupsis/groupsis.module';
import { StudentGroupModule } from 'src/student_group/student_group.module';
import { BlocksModule } from 'src/blocks/blocks.module';
import { NotificationUserModule } from 'src/notification_user/notification_user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), GroupsisModule, StudentGroupModule, BlocksModule, NotificationUserModule ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
