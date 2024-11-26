import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { Variable } from './entities/variable.entity';

@Injectable()
export class VariablesService {
  constructor(
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
  ) {}

  async create(createVariableDto: CreateVariableDto) {
    const newVariable = await this.variableRepository.create(createVariableDto);
    await this.variableRepository.save(newVariable);
    return newVariable;
  }
  /**
   * A method that fetches the variables from the database
   * @returns A promise with the list of variables
   */
  async findAll(): Promise<Variable[]> {
    const variables = await this.variableRepository.find();
    return variables;
  }
  /**
   * A method that fetches the variables from the database
   * @returns A promise with the list of variables
   */
  async findAllSection(): Promise<Variable[]> {
    const variables = await this.variableRepository.find({
      where: { section: 'variable' },
    });
    return variables;
  }
  /**
   * A method that fetches the variables from the database
   * @returns A promise with the list of variables
   */
  async findAllSeven(): Promise<Variable[]> {
    const variables = await this.variableRepository.find({
      where: { section: 'seven' },
    });
    return variables;
  }

  async findOne(id: number) {
    const variable = await this.variableRepository.findOne({
      where: { id: id },
    });
    if (variable) {
      return variable;
    }
    throw new NotFoundException(`Variable with this id: ${id} does not exist`);
  }

  async update(id: number, updateVariableDto: UpdateVariableDto) {
    const variable = await this.variableRepository.findOne(id);
    if (!variable) {
      throw new NotFoundException(
        `Variable with this id: ${id} does not exist`,
      );
    }
    variable.state = updateVariableDto.state;

    const updatedVariable = await this.variableRepository.save(variable);

    return updatedVariable;
  }
  /**
   * A method that deletes a variable from the database
   * @param id An id of a variable. A variable with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.variableRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `Variable with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
