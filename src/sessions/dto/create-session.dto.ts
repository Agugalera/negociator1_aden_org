import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Name is too long',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_teacher: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  block: Team[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;
}
export interface Team {
  team1: User[],
  team2: User[],
}

