import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClimatesService } from './climates.service';
import { CreateClimateDto } from './dto/create-climate.dto';
import { UpdateClimateDto } from './dto/update-climate.dto';

@Controller('climates')
@ApiTags('climates')
export class ClimatesController {
  constructor(private readonly climatesService: ClimatesService) {}

  @Post()
  create(@Body() createClimateDto: CreateClimateDto) {
    return this.climatesService.create(createClimateDto);
  }

  @Get()
  findAll() {
    return this.climatesService.findAll();
  }

  @Get('/groups/:id')
  findAllByGroup(@Param('id') id: string) {
    return this.climatesService.findAllByGroup(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClimateDto: UpdateClimateDto) {
    return this.climatesService.update(+id, updateClimateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climatesService.remove(+id);
  }
}
