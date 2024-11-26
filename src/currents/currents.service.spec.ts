import { Test, TestingModule } from '@nestjs/testing';
import { CurrentsService } from './currents.service';

describe('CurrentsService', () => {
  let service: CurrentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentsService],
    }).compile();

    service = module.get<CurrentsService>(CurrentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
