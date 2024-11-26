import { Test, TestingModule } from '@nestjs/testing';
import { NegociationsController } from './negociations.controller';
import { NegociationsService } from './negociations.service';

describe('NegociationsController', () => {
  let controller: NegociationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NegociationsController],
      providers: [NegociationsService],
    }).compile();

    controller = module.get<NegociationsController>(NegociationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
