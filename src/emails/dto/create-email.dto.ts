import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmailDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id_author: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty()
    @ArrayNotEmpty()
    @IsArray()
    recipients: [];
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string;
    
}
