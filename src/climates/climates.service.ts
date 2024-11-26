import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClimateDto } from './dto/create-climate.dto';
import { UpdateClimateDto } from './dto/update-climate.dto';
import { Climate } from './entities/climate.entity';

@Injectable()
export class ClimatesService {
  constructor(
    @InjectRepository(Climate)
    private climateRepository: Repository<Climate>,
  ) {}

  async create(createClimateDto: CreateClimateDto) {
    createClimateDto.state = 1;
    const newClimate = await this.climateRepository.create(createClimateDto);
    await this.climateRepository.save(newClimate);
    return newClimate;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Climate[]> {
    const climates = await this.climateRepository.find({
      order: { id: 'ASC' },
    });
    return climates;
  }

  async findAllByGroup(id_group: number): Promise<Climate[]> {
    const climates = await this.climateRepository.find({
      order: { id: 'ASC' },
      where: { id_group: id_group },
    });
    return climates;
  }

  async findOne(id: number) {
    const climate = await this.climateRepository.findOne({
      where: { id: id },
    });
    if (climate) {
      return climate;
    }
    throw new NotFoundException(`Climate with this id: ${id} does not exist`);
  }

  async update(id: number, updateClimateDto: UpdateClimateDto) {
    const climate = await this.climateRepository.findOne(id, {});
    if (!climate) {
      throw new NotFoundException(`Climate with this id: ${id} does not exist`);
    }
    climate.state = updateClimateDto.state;
    climate.id_group = updateClimateDto.id_group;
    climate.value = updateClimateDto.value;
    climate.type = updateClimateDto.type;
    climate.teacher_return = updateClimateDto.teacher_return;

    const updatedClimate = await this.climateRepository.save(climate);

    return updatedClimate;
  }
  /**
   * A method that deletes a climate from the database
   * @param id An id of a climate. A climate with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.climateRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Climate with this id: ${id} does not exist`);
    }
    return;
  }
}
