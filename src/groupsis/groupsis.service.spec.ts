import { Test, TestingModule } from '@nestjs/testing';
import { GroupsisService } from './groupsis.service';

describe('GroupsisService', () => {
  let service: GroupsisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsisService],
    }).compile();

    service = module.get<GroupsisService>(GroupsisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
