import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNegociationDto } from './create-negociation.dto';

export class UpdateNegociationDto extends PartialType(CreateNegociationDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
