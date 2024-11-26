import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, Validate, ValidateNested } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_author: number;

  target_id?: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Recipient)
  recipients: Recipient[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  target_type?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Type is too long',
  })
  type: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  creation_date: Date;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;
}

export class Recipient {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  type: string;
}
