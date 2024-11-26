import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateNegociationReplyDto } from './create-negociation_reply.dto';

export class UpdateNegociationReplyDto extends PartialType(CreateNegociationReplyDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Name is too long',
  })
  color: string;
}
