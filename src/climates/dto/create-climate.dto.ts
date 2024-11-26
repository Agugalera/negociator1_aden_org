import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateClimateDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // sisid: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Type is too long',
  })
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Author is too long',
  })
  author: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // teacher_return: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  state: number;
}
