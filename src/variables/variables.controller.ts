import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { ApiTags } from '@nestjs/swagger';
import { Variable } from './entities/variable.entity';

@Controller('variables')
@ApiTags('variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @Post()
  create(@Body() createVariableDto: CreateVariableDto) {
    return this.variablesService.create(createVariableDto);
  }

  @Get()
  findAll(): Promise<Variable[]> {
    return this.variablesService.findAll();
  }
  
  @Get('/variable')
  findAllSection(): Promise<Variable[]> {
    return this.variablesService.findAllSection();
  }

  @Get('/seven')
  findAllSeven(): Promise<Variable[]> {
    return this.variablesService.findAllSeven();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariableDto: UpdateVariableDto) {
    return this.variablesService.update(+id, updateVariableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variablesService.remove(+id);
  }
}
