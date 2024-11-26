import { Module } from '@nestjs/common';
import { StudentGroupService } from './student_group.service';
import { StudentGroupController } from './student_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student_group.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup]), UsersModule],
  controllers: [StudentGroupController],
  providers: [StudentGroupService],
  exports: [StudentGroupService],
})
export class StudentGroupModule {}
