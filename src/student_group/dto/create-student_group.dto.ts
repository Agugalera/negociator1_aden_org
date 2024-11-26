import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateStudentGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_student: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group: number;
}
