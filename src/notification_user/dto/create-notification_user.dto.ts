import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateNotificationUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_notification: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readed: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readed_date: Date;
}
