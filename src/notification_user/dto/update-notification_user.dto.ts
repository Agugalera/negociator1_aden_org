import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateNotificationUserDto } from './create-notification_user.dto';

export class UpdateNotificationUserDto extends PartialType(
  CreateNotificationUserDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readed: number;
}
