import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateVariableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250, {
    message: 'Value is too long',
  })
  value: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @MaxLength(100, {
  //   message: 'Slug is too long',
  // })
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Type is too long',
  })
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  min: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  max: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Color a is too long',
  })
  color_a: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Ok value a is too long',
  })
  okvalue_a: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reply_a: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Color b is too long',
  })
  color_b: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Ok value b is too long',
  })
  okvalue_b: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reply_b: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Section is too long',
  })
  section: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Unit is too long',
  })
  unit: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  state: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  required: number;
}
