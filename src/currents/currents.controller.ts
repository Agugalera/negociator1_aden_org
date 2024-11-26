import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CurrentsService } from './currents.service';
import { CreateCurrentDto } from './dto/create-current.dto';
import { UpdateCurrentDto } from './dto/update-current.dto';

@Controller('currents')
@ApiTags('currents')
@ApiBearerAuth()
export class CurrentsController {
  constructor(private readonly currentsService: CurrentsService) {}

  // @Post()
  // create(@Body() createCurrentDto: CreateCurrentDto) {
  //   return this.currentsService.create(createCurrentDto);
  // }

  @Get()
  findAll(@GetUser() user: User) {
    return this.currentsService.findAll(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.currentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCurrentDto: UpdateCurrentDto) {
  //   return this.currentsService.update(+id, updateCurrentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.currentsService.remove(+id);
  // }
}
