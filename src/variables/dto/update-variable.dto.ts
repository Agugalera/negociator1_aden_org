import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateVariableDto } from './create-variable.dto';

export class UpdateVariableDto extends PartialType(CreateVariableDto) {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  state: number;
}
