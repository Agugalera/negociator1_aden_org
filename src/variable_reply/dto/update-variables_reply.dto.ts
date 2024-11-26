import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateVariableReplyDto } from './create-variable_reply.dto';

export class UpdateVariablesReplyDto extends PartialType(
  CreateVariableReplyDto,
) {
}
export class VariableReplyDto {
  id_group: number;
  shared: number;
  id_variable: number;
  value: string;
  creation_date: Date;
  author: string;
  id: number;
} 