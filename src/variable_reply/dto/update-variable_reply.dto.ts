import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateVariableReplyDto } from './create-variable_reply.dto';

export class UpdateVariableReplyDto extends PartialType(
  CreateVariableReplyDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_variable: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;
  
  @ApiProperty()
  @IsDate()
  creation_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  teacher_return: string;

  @ApiProperty()
  @IsDate()
  return_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  shared: number;
}
