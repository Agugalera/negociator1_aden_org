import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, Validate, ValidateNested } from 'class-validator';

export class ReadNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_notification: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_user: number;
}