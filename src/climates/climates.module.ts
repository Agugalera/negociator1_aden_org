import { Module } from '@nestjs/common';
import { ClimatesService } from './climates.service';
import { ClimatesController } from './climates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Climate } from './entities/climate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Climate])],
  controllers: [ClimatesController],
  providers: [ClimatesService]
})
export class ClimatesModule {}
