import { Test, TestingModule } from '@nestjs/testing';
import { StudentGroupService } from './student_group.service';

describe('StudentGroupService', () => {
  let service: StudentGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentGroupService],
    }).compile();

    service = module.get<StudentGroupService>(StudentGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
