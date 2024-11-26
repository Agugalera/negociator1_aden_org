import { Test, TestingModule } from '@nestjs/testing';
import { VariableReplyController } from './variable_reply.controller';
import { VariableReplyService } from './variable_reply.service';

describe('VariableReplyController', () => {
  let controller: VariableReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariableReplyController],
      providers: [VariableReplyService],
    }).compile();

    controller = module.get<VariableReplyController>(VariableReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
