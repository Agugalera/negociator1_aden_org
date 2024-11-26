import { Module } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { VariablesController } from './variables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  controllers: [VariablesController],
  providers: [VariablesService],
  exports: [VariablesService],
})
export class VariablesModule {}
