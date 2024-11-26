import { Module } from '@nestjs/common';
import { ChangesisService } from './changesis.service';
import { ChangesisController } from './changesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Changesis } from './entities/changesi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Changesis])],
  controllers: [ChangesisController],
  providers: [ChangesisService]
})
export class ChangesisModule {}
