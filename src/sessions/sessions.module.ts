import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { BlocksModule } from 'src/blocks/blocks.module';
import { GroupsisModule } from 'src/groupsis/groupsis.module';
import { StudentGroupModule } from 'src/student_group/student_group.module';

@Module({
  imports: [
    StudentGroupModule,
    GroupsisModule,
    BlocksModule,
    TypeOrmModule.forFeature([Session]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
