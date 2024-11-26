import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { BlocksService } from 'src/blocks/blocks.service';
import { GroupsisService } from 'src/groupsis/groupsis.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { StudentGroupService } from 'src/student_group/student_group.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCurrentDto } from './dto/create-current.dto';
import { UpdateCurrentDto } from './dto/update-current.dto';

@Injectable()
export class CurrentsService {
  constructor(
    private readonly studentGroupService: StudentGroupService,
    private readonly sessionsService: SessionsService,
    private readonly blocksService: BlocksService,
    private readonly groupsisService: GroupsisService,
    private readonly profilesService: ProfilesService,
    ) {}

  create(createCurrentDto: CreateCurrentDto) {
    return 'This action adds a new current';
  }

  async findAll(user: User) {
    // user.sisid = 42059;
    // user.id = 19;
    let blocks = []
    let sessions = []
    const groups = await this.studentGroupService.findAllByUser(user.id);
    for (const group of groups) {
      const group_sis = await this.groupsisService.findOne(group.id_group);
      const block = await this.blocksService.findOne(group_sis.id_block)
      block['id_company'] = group_sis.id_company;
      blocks.push(block)
      const session = await this.sessionsService.findOne(block.id_session);
      sessions.push(session)
    }
    delete user.password
    const profile = await this.profilesService.findOne(user.id_profile);
    return {groups, sessions, blocks, sisid: user.sisid, user: {...user, profile_name: profile.name}, token: ""};
  }

  findOne(id: number) {
    return `This action returns a #${id} current`;
  }

  update(id: number, updateCurrentDto: UpdateCurrentDto) {
    return `This action updates a #${id} current`;
  }

  remove(id: number) {
    return `This action removes a #${id} current`;
  }
}
