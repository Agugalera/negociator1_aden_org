import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentGroupService } from 'src/student_group/student_group.service';
import { Repository } from 'typeorm';
import { CreateGroupsiDto } from './dto/create-groupsi.dto';
import { UpdateGroupsiDto } from './dto/update-groupsi.dto';
import { Groupsis } from './entities/groupsi.entity';

@Injectable()
export class GroupsisService {
  constructor(
    private readonly studentGroupService: StudentGroupService,
    @InjectRepository(Groupsis)
    private groupsisRepository: Repository<Groupsis>,
  ) {}

  async create(createGroupsiDto: CreateGroupsiDto) {
    const newGroupsis = await this.groupsisRepository.create(createGroupsiDto);
    await this.groupsisRepository.save(newGroupsis);
    return newGroupsis;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Groupsis[]> {
    const groupsiss = await this.groupsisRepository.find({
      order: { id: 'ASC' },
    });
    return groupsiss;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllByBlock(id_block: number): Promise<Groupsis[]> {
    const groupsiss = await this.groupsisRepository.find({
      order: { id: 'ASC' },
      where: { id_block: id_block}
    });
    return groupsiss;
  }

    /**
   * A method that fetches the Groupsis from the database
   * @returns A promise with the list of Groupsis
   */
     async findAllByBlockId(id_block: number): Promise<any[]> {
      const groupsiss = await this.groupsisRepository.find({
        order: { id: 'ASC' },
        where: { id_block: id_block}
      });
      for (const group of groupsiss) {
        const studenGroup = await this.studentGroupService.findAllByIdGroup(group.id);
        group['students'] = studenGroup;
      }
      return groupsiss;
    }
  
    /**
   * A method that fetches the Groupsis from the database
   * @returns A promise with the list of Groupsis
   */
     async findOneByBlockId(id_block: number): Promise<Groupsis> {
      const groupsiss = await this.groupsisRepository.findOne({
        order: { id: 'ASC' },
        where: { id_block: id_block}
      });
      return groupsiss;
    }
  

  async findOne(id: number) {
    const groupsis = await this.groupsisRepository.findOne({
      where: { id: id },
    });
    if (groupsis) {
      return groupsis;
    }
    throw new NotFoundException(`Groupsis with this id: ${id} does not exist`);
  }

  async update(id: number, updateGroupsiDto: UpdateGroupsiDto) {
    const groupsis = await this.groupsisRepository.findOne(id, {});
    if (!groupsis) {
      throw new NotFoundException(
        `Groupsis with this id: ${id} does not exist`,
      );
    }
    groupsis.state = updateGroupsiDto.state;

    const updatedGroupsis = await this.groupsisRepository.save(groupsis);

    return updatedGroupsis;
  }
  /**
   * A method that deletes a groupsis from the database
   * @param id An id of a groupsis. A groupsis with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.groupsisRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `Groupsis with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
