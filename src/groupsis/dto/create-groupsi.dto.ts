import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateGroupsiDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_block: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_company: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state: number;
}
