import { Test, TestingModule } from '@nestjs/testing';
import { StudentGroupController } from './student_group.controller';
import { StudentGroupService } from './student_group.service';

describe('StudentGroupController', () => {
  let controller: StudentGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentGroupController],
      providers: [StudentGroupService],
    }).compile();

    controller = module.get<StudentGroupController>(StudentGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
