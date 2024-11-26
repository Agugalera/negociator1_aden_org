import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateGroupsiDto } from './create-groupsi.dto';

export class UpdateGroupsiDto extends PartialType(CreateGroupsiDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;
}
