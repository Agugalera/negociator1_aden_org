import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250, {
    message: 'Name is too long',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(300, {
    message: 'Logo is too long',
  })
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  welcome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutOther: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  market: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutMe: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  robots: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  negotiation: string;
}
