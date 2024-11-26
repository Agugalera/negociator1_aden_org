import { PartialType } from '@nestjs/swagger';
import { CreateCurrentDto } from './create-current.dto';

export class UpdateCurrentDto extends PartialType(CreateCurrentDto) {}
