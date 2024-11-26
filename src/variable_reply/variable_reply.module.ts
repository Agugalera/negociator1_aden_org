import { Module } from '@nestjs/common';
import { VariableReplyService } from './variable_reply.service';
import { VariableReplyController } from './variable_reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableReply } from './entities/variable_reply.entity';
import { VariablesModule } from 'src/variables/variables.module';
import { GroupsisModule } from 'src/groupsis/groupsis.module';

@Module({
  imports: [TypeOrmModule.forFeature([VariableReply]), VariablesModule, GroupsisModule],
  controllers: [VariableReplyController],
  providers: [VariableReplyService],
  exports: [VariableReplyService],
})
export class VariableReplyModule {}
