import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVariableReplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_variable: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  creation_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  teacher_return: string;
  shared: number;
  return_date: Date;
}
