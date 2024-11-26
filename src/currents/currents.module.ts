import { Module } from '@nestjs/common';
import { CurrentsService } from './currents.service';
import { CurrentsController } from './currents.controller';
import { SessionsModule } from 'src/sessions/sessions.module';
import { BlocksModule } from 'src/blocks/blocks.module';
import { GroupsisModule } from 'src/groupsis/groupsis.module';
import { StudentGroupModule } from 'src/student_group/student_group.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [SessionsModule, BlocksModule, GroupsisModule, StudentGroupModule, ProfilesModule],
  controllers: [CurrentsController],
  providers: [CurrentsService]
})
export class CurrentsModule {}
