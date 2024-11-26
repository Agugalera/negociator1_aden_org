import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsisService } from './groupsis.service';
import { CreateGroupsiDto } from './dto/create-groupsi.dto';
import { UpdateGroupsiDto } from './dto/update-groupsi.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('groupsis')
@ApiTags('groupsis')
export class GroupsisController {
  constructor(private readonly groupsisService: GroupsisService) {}

  @Post()
  create(@Body() createGroupsiDto: CreateGroupsiDto) {
    return this.groupsisService.create(createGroupsiDto);
  }

  @Get()
  findAll() {
    return this.groupsisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupsiDto: UpdateGroupsiDto) {
    return this.groupsisService.update(+id, updateGroupsiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsisService.remove(+id);
  }
}
