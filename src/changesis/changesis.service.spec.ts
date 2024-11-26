import { Test, TestingModule } from '@nestjs/testing';
import { ChangesisService } from './changesis.service';

describe('ChangesisService', () => {
  let service: ChangesisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangesisService],
    }).compile();

    service = module.get<ChangesisService>(ChangesisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
