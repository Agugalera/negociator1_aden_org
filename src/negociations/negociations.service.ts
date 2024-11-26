import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { GroupsisService } from 'src/groupsis/groupsis.service';
import { NegociationReplyService } from 'src/negociation_reply/negociation_reply.service';
import { UsersService } from 'src/users/users.service';
import { VariablesService } from 'src/variables/variables.service';
import { Repository } from 'typeorm';
import { CreateNegociationDto } from './dto/create-negociation.dto';
import { UpdateNegociationDto } from './dto/update-negociation.dto';
import { Negociation } from './entities/negociation.entity';

@Injectable()
export class NegociationsService {
  constructor(
    private readonly variablesService: VariablesService,
    private readonly usersService: UsersService,
    private readonly groupsisService: GroupsisService,
    private readonly companiesService: CompaniesService,
    private readonly negociationReplyService: NegociationReplyService,
    @InjectRepository(Negociation)
    private negociationRepository: Repository<Negociation>,
  ) {}

  async create(createNegociationDto: CreateNegociationDto) {
    const groupSis = await this.groupsisService.findOne(createNegociationDto.id_group_author);
    const newNegociation = await this.negociationRepository.create({
      id_user_author: createNegociationDto.id_user_author,
      id_block: groupSis.id_block,
      id_group_author: createNegociationDto.id_group_author,
      message: createNegociationDto.message,
      phase: createNegociationDto.phase,
      state: createNegociationDto.state,
      creation_date: new Date(),
    });
    await this.negociationRepository.save(newNegociation);
    let reply = []
    for (const rep of createNegociationDto.reply) {
      const negociationReplyUpdated = await this.negociationReplyService.update(rep.id, {...rep, id_negociation: newNegociation.id });
      reply.push(negociationReplyUpdated);
    }
    newNegociation['reply'] = reply;
    return newNegociation;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Negociation[]> {
    const negociations = await this.negociationRepository.find({
      order: { id: 'ASC' },
    });
    return negociations;
  }

  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllHistoryByBlock(id_block: number): Promise<Negociation[]> {
    const negociations = await this.negociationRepository.find({
      order: { id: 'ASC' },
      where: { id_block: id_block },
    });
    for (let negociation of negociations) {
      const user = await this.usersService.findOne(negociation.id_user_author);
      const groupsis = await this.groupsisService.findOne(negociation.id_group_author);
      const company = await this.companiesService.findOne(groupsis.id_company);
      negociation['user_author'] = user;
      negociation['company_name'] = company.name;
    }
    return negociations;
  }

  async findOne(id: number) {
    const negociation = await this.negociationRepository.findOne({
      where: { id: id },
    });
    if (negociation) {
      return negociation;
    }
    throw new NotFoundException(
      `Negociation with this id: ${id} does not exist`,
    );
  }

  async findOneByBlockId(id_block: number) {
    let negociation = await this.negociationRepository.findOne({
      where: { id_block: id_block },
    });

    if (negociation) {
      const variables = await this.variablesService.findAllSection();
      let reply = [];
      for (let variable of variables) {
        const negociationReply = await this.negociationReplyService.findOneVariableIdNegociationId(variable.id, negociation.id);
        variable['reply'] = negociationReply;
        reply.push(variable);
      }
      negociation['reply'] = reply;
      return negociation;
    }
    throw new NotFoundException(
      `Negociation with this id: ${id_block} does not exist`,
    );
  }

  async findOneByGroupsId(id_group_author: number) {
    let negociation = await this.negociationRepository.findOne({
      where: { id_group_author: id_group_author },
    });
    if (negociation) {
      const variables = await this.variablesService.findAllSection();
      let reply = [];
      for (let variable of variables) {
        const negociationReply = await this.negociationReplyService.findOneVariableIdNegociationId(variable.id, negociation.id);
        variable['reply'] = negociationReply;
        reply.push(variable);
      }
      negociation['reply'] = reply;
      return negociation;
    }
    throw new NotFoundException(
      `Negociation with this id: ${id_group_author} does not exist`,
    );
  }

  async update(id: number, updateNegociationDto: UpdateNegociationDto) {
    const negociation = await this.negociationRepository.findOne(id, {
    });
    if (!negociation) {
      throw new NotFoundException(
        `Negociation with this id: ${id} does not exist`,
      );
    }
    negociation.message = updateNegociationDto.message;

    const updatedNegociation = await this.negociationRepository.save(
      negociation,
    );

    return updatedNegociation;
  }
  /**
   * A method that deletes a negociation from the database
   * @param id An id of a negociation. A negociation with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.negociationRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `Negociation with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
