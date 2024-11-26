import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChangesiDto } from './dto/create-changesi.dto';
import { UpdateChangesiDto } from './dto/update-changesi.dto';
import { Changesis } from './entities/changesi.entity';

@Injectable()
export class ChangesisService {
  constructor(
    @InjectRepository(Changesis)
    private changesisRepository: Repository<Changesis>,
  ) {}

  async create(createChangesiDto: CreateChangesiDto) {
    const newChangesis = await this.changesisRepository.create(
      createChangesiDto,
    );
    await this.changesisRepository.save(newChangesis);
    return newChangesis;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Changesis[]> {
    const changesiss = await this.changesisRepository.find({
      order: { id: 'ASC' },
    });
    return changesiss;
  }

  async findOne(id: number) {
    const changesis = await this.changesisRepository.findOne({
      where: { id: id },
    });
    if (changesis) {
      return changesis;
    }
    throw new NotFoundException(`Changesis with this id: ${id} does not exist`);
  }

  async update(id: number, updateChangesisDto: UpdateChangesiDto) {
    const changesis = await this.changesisRepository.findOne(id);
    if (!changesis) {
      throw new NotFoundException(
        `Changesis with this id: ${id} does not exist`,
      );
    }
    changesis.stage = updateChangesisDto.stage;

    const updatedChangesis = await this.changesisRepository.save(changesis);

    return updatedChangesis;
  }
  /**
   * A method that deletes a changesis from the database
   * @param id An id of a changesis. A changesis with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.changesisRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `Changesis with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
