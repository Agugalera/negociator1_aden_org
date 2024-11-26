import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NegociationReplyService } from './negociation_reply.service';
import { CreateNegociationReplyDto } from './dto/create-negociation_reply.dto';
import { UpdateNegociationReplyDto } from './dto/update-negociation_reply.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('negociation-reply')
@ApiTags('negociation-reply')
export class NegociationReplyController {
  constructor(private readonly negociationReplyService: NegociationReplyService) {}

  @Post()
  create(@Body() createNegociationReplyDto: CreateNegociationReplyDto) {
    return this.negociationReplyService.create(createNegociationReplyDto);
  }

  @Get()
  findAll() {
    return this.negociationReplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negociationReplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNegociationReplyDto: UpdateNegociationReplyDto) {
    return this.negociationReplyService.update(+id, updateNegociationReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.negociationReplyService.remove(+id);
  }
}
