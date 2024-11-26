import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateNegociationReplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_negociation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_variable: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Name is too long',
  })
  color: string;
}
