import { Module } from '@nestjs/common';
import { GroupsisService } from './groupsis.service';
import { GroupsisController } from './groupsis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groupsis } from './entities/groupsi.entity';
import { StudentGroupModule } from 'src/student_group/student_group.module';

@Module({
  imports: [TypeOrmModule.forFeature([Groupsis]), StudentGroupModule],
  controllers: [GroupsisController],
  providers: [GroupsisService],
  exports: [GroupsisService],
})
export class GroupsisModule {}
