import { Test, TestingModule } from '@nestjs/testing';
import { NegociationsService } from './negociations.service';

describe('NegociationsService', () => {
  let service: NegociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NegociationsService],
    }).compile();

    service = module.get<NegociationsService>(NegociationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
