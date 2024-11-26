import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlocksService } from 'src/blocks/blocks.service';
import { GroupsisService } from 'src/groupsis/groupsis.service';
import { StudentGroupService } from 'src/student_group/student_group.service';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    private readonly blocksService: BlocksService,
    private readonly groupsisService: GroupsisService,
    private readonly studentGroupService: StudentGroupService,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const today = new Date()
    const date = today.toISOString().split('T')[0];

    const createSessionDtoCast = {
      name: createSessionDto.name,
      id_teacher: createSessionDto.id_teacher,
      block: createSessionDto.block,
      id_subject: 14681,
      state: createSessionDto.state,
      date: date,
    };
    const newSession = await this.sessionRepository.create(
      createSessionDtoCast,
    );
    await this.sessionRepository.save(newSession);
    createSessionDto.block.forEach(async (block) => {
      const newBlock = await this.blocksService.create({
        id_session: newSession.id,
        state: 'pre',
        stage: 'ready'
      });
      const team1 = await this.groupsisService.create({
        id_block: newBlock.id,
        id_company: 1,
        state: 1
      });
      const team2 = await this.groupsisService.create({
        id_block: newBlock.id,
        id_company: 2,
        state: 1
      });
      block.team1.forEach(async (student) => {
        const studentGroup = await this.studentGroupService.create({
          id_student: student.id,
          id_group: team1.id,
        });
      });
      block.team2.forEach(async (student) => {
        const studentGroup = await this.studentGroupService.create({
          id_student: student.id,
          id_group: team2.id,
        });
      });

    });
    return newSession;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Session[]> {
    const sessions = await this.sessionRepository.find();
    return sessions;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllBySubject(subjectId: number): Promise<Session[]> {
    const sessions = await this.sessionRepository.find({where: { id_subject: subjectId } });
    return sessions;
  }
  /**
   * A method that fetches the c from the database
   * @returns A promise with the list of sessions
   */
  async findAllByTeacherId(id_teacher: number): Promise<any[]> {
    const sessions = await this.sessionRepository.find({where: { id_teacher: id_teacher } });
    for (const session of sessions) {
      const block = await this.blocksService.findAllBySession(session.id);
      session['blocks'] = block;
    }
    return sessions;
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: id },
    });
    if (session) {
      const block = await this.blocksService.findAllBySession(session.id);
      session['blocks'] = block;
      return session;
    }
    throw new NotFoundException(`Session with this id: ${id} does not exist`);
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.sessionRepository.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with this id: ${id} does not exist`);
    }
    session.name = updateSessionDto.name;

    const updatedSession = await this.sessionRepository.save(session);

    return updatedSession;
  }
  /**
   * A method that deletes a session from the database
   * @param id An id of a session. A session with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.sessionRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Session with this id: ${id} does not exist`);
    }
    return;
  }
}
