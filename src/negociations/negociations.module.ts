import { Module } from '@nestjs/common';
import { NegociationsService } from './negociations.service';
import { NegociationsController } from './negociations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negociation } from './entities/negociation.entity';
import { VariablesModule } from 'src/variables/variables.module';
import { NegociationReplyModule } from 'src/negociation_reply/negociation_reply.module';
import { UsersModule } from 'src/users/users.module';
import { GroupsisModule } from 'src/groupsis/groupsis.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Negociation]), VariablesModule, NegociationReplyModule, UsersModule, GroupsisModule, CompaniesModule ],
  controllers: [NegociationsController],
  providers: [NegociationsService]
})
export class NegociationsModule {}
