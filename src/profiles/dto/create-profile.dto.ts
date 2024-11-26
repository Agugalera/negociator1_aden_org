import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

}
