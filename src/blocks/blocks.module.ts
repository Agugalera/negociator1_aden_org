import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';
import { GroupsisModule } from 'src/groupsis/groupsis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Block]), GroupsisModule],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService]
})
export class BlocksModule {}
