import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChangesisService } from './changesis.service';
import { CreateChangesiDto } from './dto/create-changesi.dto';
import { UpdateChangesiDto } from './dto/update-changesi.dto';

@Controller('changesis')
@ApiTags('changesis')
export class ChangesisController {
  constructor(private readonly changesisService: ChangesisService) {}

  @Post()
  create(@Body() createChangesiDto: CreateChangesiDto) {
    return this.changesisService.create(createChangesiDto);
  }

  @Get()
  findAll() {
    return this.changesisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changesisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChangesiDto: UpdateChangesiDto,
  ) {
    return this.changesisService.update(+id, updateChangesiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changesisService.remove(+id);
  }
}
