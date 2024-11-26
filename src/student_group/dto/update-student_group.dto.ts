import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStudentGroupDto } from './create-student_group.dto';

export class UpdateStudentGroupDto extends PartialType(CreateStudentGroupDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_student: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group: number;
}
