import { Test, TestingModule } from '@nestjs/testing';
import { ChangesisController } from './changesis.controller';
import { ChangesisService } from './changesis.service';

describe('ChangesisController', () => {
  let controller: ChangesisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangesisController],
      providers: [ChangesisService],
    }).compile();

    controller = module.get<ChangesisController>(ChangesisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
