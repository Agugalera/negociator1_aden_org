import { Module } from '@nestjs/common';
import { NegociationReplyService } from './negociation_reply.service';
import { NegociationReplyController } from './negociation_reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociationReply } from './entities/negociation_reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NegociationReply])],
  controllers: [NegociationReplyController],
  providers: [NegociationReplyService],
  exports: [NegociationReplyService]
})
export class NegociationReplyModule {}
