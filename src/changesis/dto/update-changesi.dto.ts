import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateChangesiDto } from './create-changesi.dto';

export class UpdateChangesiDto extends PartialType(CreateChangesiDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stage: number;
}
