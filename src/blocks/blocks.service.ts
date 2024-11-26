import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsisService } from 'src/groupsis/groupsis.service';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlocksService {
  constructor(
    private readonly groupsisService: GroupsisService,
    @InjectRepository(Block)
    private blocksRepository: Repository<Block>,
  ) {}

  async create(createBlockDto: CreateBlockDto) {
    const newBlock = await this.blocksRepository.create(createBlockDto);
    await this.blocksRepository.save(newBlock);
    return newBlock;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Block[]> {
    const blocks = await this.blocksRepository.find({
      order: { id: 'ASC' },
    });
    return blocks;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllBySession(sessionId: number): Promise<any[]> {
    let blocks = await this.blocksRepository.find({
      where: { id_session: sessionId },
    });
    for (const block of blocks) {
      block['groups'] = await this.groupsisService.findAllByBlockId(block.id);
    }
    return blocks;
  }

  async findOne(id: number):Promise<Block> {
    const block = await this.blocksRepository.findOne({
      where: { id: id },
    });
    if (block) {
      const groupsis = await this.groupsisService.findOneByBlockId(block.id)
      return block;
    }
    throw new NotFoundException(`Block with this id: ${id} does not exist`);
  }

  async update(id: number, updateBlockDto: UpdateBlockDto) {
    const block = await this.blocksRepository.findOne(id, {
    });
    if (!block) {
      throw new NotFoundException(`Block with this id: ${id} does not exist`);
    }
    block.state = updateBlockDto.state;

    const updatedBlock = await this.blocksRepository.save(block);

    return updatedBlock;
  }
  /**
   * A method that deletes a block from the database
   * @param id An id of a block. A block with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.blocksRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Block with this id: ${id} does not exist`);
    }
    return;
  }
}
