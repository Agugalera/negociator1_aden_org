import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { ClimatesModule } from './climates/climates.module';
import { ChangesisModule } from './changesis/changesis.module';
import { CompaniesModule } from './companies/companies.module';
import { GroupsisModule } from './groupsis/groupsis.module';
import { NegociationsModule } from './negociations/negociations.module';
import { NegociationReplyModule } from './negociation_reply/negociation_reply.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationUserModule } from './notification_user/notification_user.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SessionsModule } from './sessions/sessions.module';
import { StudentGroupModule } from './student_group/student_group.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { VariablesModule } from './variables/variables.module';
import { VariableReplyModule } from './variable_reply/variable_reply.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CurrentsModule } from './currents/currents.module';
import { EmailsModule } from './emails/emails.module';
import { RepliesModule } from './replies/replies.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.NODE_ENV}.env`],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
        MYSQL_HOST: Joi.string().required() || process.env.NODE_ENV,
        MYSQL_PORT: Joi.number().required() || process.env.MYSQL_PORT,
        MYSQL_USER: Joi.string().required() || process.env.MYSQL_USER,
        MYSQL_PASSWORD: Joi.string().default('') || process.env.MYSQL_PASSWORD,
        MYSQL_DB: Joi.string().required() || process.env.MYSQL_DB,
        PORT: Joi.number().default(3000) || process.env.PORT,
        JWT_SECRET: Joi.string().default('secret') || process.env.JWT_SECRET,
        JWT_EXPIRATION_TIME: Joi.number().required() || process.env.JWT_EXPIRATION_TIME,
      })
    }),
    DatabaseModule,
    BlocksModule,
    ClimatesModule,
    ChangesisModule,
    CompaniesModule,
    GroupsisModule,
    NegociationsModule,
    NegociationReplyModule,
    NotificationsModule,
    NotificationUserModule,
    ProfilesModule,
    SessionsModule,
    StudentGroupModule,
    TokensModule,
    UsersModule,
    VariablesModule,
    VariableReplyModule,
    AuthModule,
    DatabaseModule,
    CurrentsModule,
    EmailsModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
