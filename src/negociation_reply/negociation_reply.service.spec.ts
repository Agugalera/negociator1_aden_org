import { Test, TestingModule } from '@nestjs/testing';
import { NegociationReplyService } from './negociation_reply.service';

describe('NegociationReplyService', () => {
  let service: NegociationReplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NegociationReplyService],
    }).compile();

    service = module.get<NegociationReplyService>(NegociationReplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
