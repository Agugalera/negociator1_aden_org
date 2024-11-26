import { Test, TestingModule } from '@nestjs/testing';
import { NegociationReplyController } from './negociation_reply.controller';
import { NegociationReplyService } from './negociation_reply.service';

describe('NegociationReplyController', () => {
  let controller: NegociationReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NegociationReplyController],
      providers: [NegociationReplyService],
    }).compile();

    controller = module.get<NegociationReplyController>(NegociationReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
