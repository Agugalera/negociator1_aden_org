import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { number, string } from 'joi';
import { CreateReplyDto } from './create-reply.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsDate()
    creation_date: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_variable: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    color: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_group: number;
}