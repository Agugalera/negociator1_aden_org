import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('replies')
@ApiTags('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  // @Post()
  // create(@Body() createReplyDto: CreateReplyDto) {
  //   return this.repliesService.create(createReplyDto);
  // }

  @Get()
  findAll() {
    return this.repliesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.repliesService.findOne(+id);
  // }

  @Get('/full/group/:id_group')
  findOne(@Param('id_group') id_group : string) {
    return this.repliesService.findOne(+id_group );
  }

  @Put()
  update(@Body() updateReplyDto: UpdateReplyDto[]) {
    return this.repliesService.update(updateReplyDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
  //   return this.repliesService.update(+id, updateReplyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.repliesService.remove(+id);
  // }
}
