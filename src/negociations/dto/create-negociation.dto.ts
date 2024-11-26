import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateNegociationDto {

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // id_block: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_group_author: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_user_author: number;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  teacher_return: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readed: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Title is too long',
  })
  phase: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;
  
  @ArrayNotEmpty()
  @IsArray()
  reply: any[]
}
