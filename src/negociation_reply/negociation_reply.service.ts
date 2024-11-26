import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNegociationReplyDto } from './dto/create-negociation_reply.dto';
import { UpdateNegociationReplyDto } from './dto/update-negociation_reply.dto';
import { NegociationReply } from './entities/negociation_reply.entity';

@Injectable()
export class NegociationReplyService {
  constructor(
    @InjectRepository(NegociationReply)
    private negociationReplyRepository: Repository<NegociationReply>,
  ) {}

  async create(createNegociationReplyDto: CreateNegociationReplyDto) {
    const newNegociationReply = await this.negociationReplyRepository.create(
      createNegociationReplyDto,
    );
    await this.negociationReplyRepository.save(newNegociationReply);
    return newNegociationReply;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<NegociationReply[]> {
    const negociationReplys = await this.negociationReplyRepository.find({
      order: { id: 'ASC' },
    });
    return negociationReplys;
  }

  async findOne(id: number) {
    const negociationReply = await this.negociationReplyRepository.findOne({
      where: { id: id },
    });
    if (negociationReply) {
      return negociationReply;
    }
    throw new NotFoundException(
      `NegociationReply with this id: ${id} does not exist`,
    );
  }

  async findOneVariableIdNegociationId(id_variable: number, id_negociation: number, ) {
    const negociationReply = await this.negociationReplyRepository.findOne({
      where: { id_negociation: id_negociation, id_variable:id_variable},
    });
    if (negociationReply) {
      return negociationReply;
    }
    throw new NotFoundException(
      `NegociationReply with this id: ${id_negociation} does not exist`,
    );
  }

  async update(
    id: number,
    updateNegociationReplyDto: UpdateNegociationReplyDto,
  ) {
    const negociationReply = await this.negociationReplyRepository.findOne(id);
    if (!negociationReply) {
      throw new NotFoundException(
        `NegociationReply with this id: ${id} does not exist`,
      );
    }
    negociationReply.color = updateNegociationReplyDto.color;
    negociationReply.value = updateNegociationReplyDto.value;

    const updatedNegociationReply = await this.negociationReplyRepository.save(
      negociationReply,
    );

    return updatedNegociationReply;
  }
  /**
   * A method that deletes a negociationReply from the database
   * @param id An id of a negociationReply. A negociationReply with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.negociationReplyRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `NegociationReply with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
