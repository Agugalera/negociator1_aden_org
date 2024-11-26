import { Test, TestingModule } from '@nestjs/testing';
import { VariableReplyService } from './variable_reply.service';

describe('VariableReplyService', () => {
  let service: VariableReplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariableReplyService],
    }).compile();

    service = module.get<VariableReplyService>(VariableReplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
