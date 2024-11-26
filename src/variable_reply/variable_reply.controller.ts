import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VariableReplyService } from './variable_reply.service';
import { CreateVariableReplyDto } from './dto/create-variable_reply.dto';
import { UpdateVariableReplyDto } from './dto/update-variable_reply.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateVariablesReplyDto, VariableReplyDto } from './dto/update-variables_reply.dto';

@Controller('variable-reply')
@ApiTags('variable-reply')
export class VariableReplyController {
  constructor(private readonly variableReplyService: VariableReplyService) {}

  @Post()
  create(@Body() createVariableReplyDto: CreateVariableReplyDto[]) {
    return this.variableReplyService.create(createVariableReplyDto);
  }

  @Get()
  findAll() {
    return this.variableReplyService.findAll();
  }

  @Get('/group/:id')
  findAllByGroup(@Param('id') id: string) {
    return this.variableReplyService.findAllByGroup(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variableReplyService.findOne(+id);
  }

  @Put()
  updateVariables(@Body() updateVariableReplyDto: VariableReplyDto[]) {
    return this.variableReplyService.updateVariablesFromReply(updateVariableReplyDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariableReplyDto: UpdateVariableReplyDto) {
    return this.variableReplyService.update(+id, updateVariableReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variableReplyService.remove(+id);
  }
}
