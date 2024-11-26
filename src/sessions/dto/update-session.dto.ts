import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Name is too long',
  })
  name: string;
}
