import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateClimateDto } from './create-climate.dto';

export class UpdateClimateDto extends PartialType(CreateClimateDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group: number;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  teacher_return: string;
}
