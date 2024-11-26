import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NegociationsService } from './negociations.service';
import { CreateNegociationDto } from './dto/create-negociation.dto';
import { UpdateNegociationDto } from './dto/update-negociation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('negociations')
@ApiTags('negociations')
export class NegociationsController {
  constructor(private readonly negociationsService: NegociationsService) {}

  @Post()
  create(@Body() createNegociationDto: CreateNegociationDto) {
    return this.negociationsService.create(createNegociationDto);
  }

  @Get()
  findAll() {
    return this.negociationsService.findAll();
  }

  @Get('/blocks/:id')
  findOneByBlockId(@Param('id') id: string) {
    return this.negociationsService.findOneByBlockId(+id);
  }

  @Get('/groups/:id')
  findOneByGroupsId(@Param('id') id: string) {
    return this.negociationsService.findOneByGroupsId(+id);
  }

  @Get('/histories/blocks/:id')
  findAllHistoryByBlock(@Param('id') id: string) {
    return this.negociationsService.findAllHistoryByBlock(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negociationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNegociationDto: UpdateNegociationDto) {
    return this.negociationsService.update(+id, updateNegociationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.negociationsService.remove(+id);
  }
}
