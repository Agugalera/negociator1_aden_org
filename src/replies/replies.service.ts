import { Injectable } from '@nestjs/common';
import { VariablesService } from 'src/variables/variables.service';
import { VariableReplyService } from 'src/variable_reply/variable_reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesService {
  constructor(
    private readonly variablesService: VariablesService,
    private readonly variableReplyService: VariableReplyService,
  ) {}
  create(createReplyDto: CreateReplyDto) {
    return 'This action adds a new reply';
  }

  findAll() {
    return `This action returns all replies`;
  }

  findOne(id_group : number) {
    const reply = this.variableReplyService.findAllByGroup(id_group)
    return reply;
  }

  async update(updateReplyDto: UpdateReplyDto[]) {
    const updatedVariableReply = await this.variableReplyService.updateVariables(updateReplyDto);
    return updatedVariableReply;
  }
  // update(id: number, updateReplyDto: UpdateReplyDto) {
  //   return `This action updates a #${id} reply`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reply`;
  // }
}
