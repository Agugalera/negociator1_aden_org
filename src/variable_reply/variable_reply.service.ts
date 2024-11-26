import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VariablesService } from 'src/variables/variables.service';
import { Repository } from 'typeorm';
import { CreateVariableReplyDto } from './dto/create-variable_reply.dto';
import { UpdateVariablesReplyDto, VariableReplyDto } from './dto/update-variables_reply.dto';
import { UpdateVariableReplyDto } from './dto/update-variable_reply.dto';
import { VariableReply } from './entities/variable_reply.entity';

@Injectable()
export class VariableReplyService {
  constructor(
    private readonly variablesService: VariablesService,
    @InjectRepository(VariableReply)
    private variableReplyRepository: Repository<VariableReply>,
  ) {}

  async create(createVariableReplyDto: CreateVariableReplyDto[]) {
    let response = []
    for (const variableReplyDto of createVariableReplyDto) {
      if (!variableReplyDto.color) {
        variableReplyDto.color = '';
      }
      if (!variableReplyDto.teacher_return) {
        variableReplyDto.teacher_return = ' ';
      }
      if (!variableReplyDto.return_date) {
        variableReplyDto.return_date = new Date();
      }
      if (!variableReplyDto.shared) {
        variableReplyDto.shared = 1;
      }
      const newVariableReply = await this.variableReplyRepository.create(
        variableReplyDto,
        );
        await this.variableReplyRepository.save(newVariableReply);
        response.push(newVariableReply)

    }
    return response;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<VariableReply[]> {
    const variableReplys = await this.variableReplyRepository.find();
    return variableReplys;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllByGroup(id_group: number): Promise<VariableReply[]> {
    const variables = await this.variablesService.findAll();
    let respuestas = []
    for (const variable of variables) {
      const variableReply = await this.variableReplyRepository.find({
        where: { id_group: id_group, id_variable: variable.id },
        order: { id: 'DESC' },
        take: 1
      });
      respuestas.push({...variable, response:variableReply[0] })
    }
    return respuestas;
  }

  async findOne(id: number) {
    const variableReply = await this.variableReplyRepository.findOne({
      where: { id: id },
    });
    if (variableReply) {
      return variableReply;
    }
    throw new NotFoundException(
      `VariableReply with this id: ${id} does not exist`,
    );
  }

  async update(id: number, updateVariableReplyDto: UpdateVariableReplyDto) {
    const variableReply = await this.variableReplyRepository.findOne(id);
    if (!variableReply) {
      throw new NotFoundException(
        `VariableReply with this id: ${id} does not exist`,
      );
    }
    variableReply.id_variable = updateVariableReplyDto.id_variable;
    variableReply.id_group = updateVariableReplyDto.id_group;
    variableReply.value = updateVariableReplyDto.value;
    variableReply.color = updateVariableReplyDto.color;
    variableReply.author = updateVariableReplyDto.author;
    variableReply.teacher_return = updateVariableReplyDto.teacher_return;
    variableReply.return_date = updateVariableReplyDto.return_date;
    variableReply.shared = updateVariableReplyDto.shared;

    const updatedVariableReply = await this.variableReplyRepository.save(
      variableReply,
    );

    return updatedVariableReply;
  }

  async updateVariables(updateVariablesReplyDto: UpdateVariablesReplyDto[]) {
    let response = []
    // console.log('updateVariablesReplyDto :>> ', updateVariablesReplyDto);
    for (const variableReply of updateVariablesReplyDto) {
      console.log('variableReply.id :>> ', variableReply['id']);
      const variablesReply = await this.variableReplyRepository.findOne(parseInt(variableReply['id']));
      if (!variablesReply) {
        throw new NotFoundException(
          `VariableReply with this id: ${variableReply['id']} does not exist`,
          );
      }
      if (variableReply['shared']) {
        variablesReply.shared = variableReply['shared'];
      }
      variablesReply.value = variableReply['value'];
      variablesReply.author = variableReply['author'];
      variablesReply.color = variableReply['color'];
      const updatedVariableReply = await this.variableReplyRepository.save(
        variablesReply,
      );
      response.push(updatedVariableReply)
      }
    return response;
  }


  async updateVariablesFromReply(updateVariablesReplyDto: VariableReplyDto[]) {
    let response = []
    // console.log('updateVariablesReplyDto :>> ', updateVariablesReplyDto);
    for (const variableReply of updateVariablesReplyDto) {
      // console.log('variableReply.id :>> ', variableReply['id']);

      const variablesReply = await this.variableReplyRepository.findOne(
        {where: {id_group: variableReply.id_group, id_variable: variableReply.id_variable },
      });
      if (!variablesReply) {
        throw new NotFoundException(
          `VariableReply with this id: ${variableReply.id_group}, ${variableReply.id_variable} does not exist`,
          );
      }
      variablesReply.shared = variableReply.shared;
      variablesReply.value = variableReply.value;
      variablesReply.author = variableReply.author;
      const updatedVariableReply = await this.variableReplyRepository.save(
        variablesReply,
      );
      response.push(updatedVariableReply)
      }
    return response;
  }

  /**
   * A method that deletes a variableReply from the database
   * @param id An id of a variableReply. A variableReply with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.variableReplyRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `VariableReply with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
