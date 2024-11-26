import { Test, TestingModule } from '@nestjs/testing';
import { GroupsisController } from './groupsis.controller';
import { GroupsisService } from './groupsis.service';

describe('GroupsisController', () => {
  let controller: GroupsisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsisController],
      providers: [GroupsisService],
    }).compile();

    controller = module.get<GroupsisController>(GroupsisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
