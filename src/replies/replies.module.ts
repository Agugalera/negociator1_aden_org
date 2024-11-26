import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { VariablesModule } from 'src/variables/variables.module';
import { VariableReplyModule } from 'src/variable_reply/variable_reply.module';

@Module({
  imports: [VariableReplyModule, VariablesModule],
  controllers: [RepliesController],
  providers: [RepliesService]
})
export class RepliesModule {}
