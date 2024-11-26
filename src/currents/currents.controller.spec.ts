import { Test, TestingModule } from '@nestjs/testing';
import { CurrentsController } from './currents.controller';
import { CurrentsService } from './currents.service';

describe('CurrentsController', () => {
  let controller: CurrentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentsController],
      providers: [CurrentsService],
    }).compile();

    controller = module.get<CurrentsController>(CurrentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
