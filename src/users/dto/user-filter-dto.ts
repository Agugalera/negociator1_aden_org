import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Profile } from "./profile.enum";

export class UserFilterDto {
    @ApiProperty()
    @IsOptional()
    @IsIn([
        Profile.admin,
        Profile.teacher,
        Profile.student,
        Profile.guest
    ])
    profile: Profile;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    search: string

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset?: number;
   
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
} 