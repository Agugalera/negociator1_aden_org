import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateChangesiDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Author is too long',
  })
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stage: number;
}
