import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { QuestionsModule } from './questions/questions.module';
import { Questions } from './entities/question.entity';
import { SurveyModule } from './survey/survey.module';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/survey-question.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: /* process.env.DB_HOST */ '172.17.0.2',
      port: /* parseInt(process.env.DB_PORT) */ 5432,
      username: /* process.env.DB_USERNAME */ 'tequilabot',
      password: /* process.env.DB_PASSWORD */ 'porchecayen',
      database: /* process.env.DB_DATABASE */ 'coffe-life-db',
      entities: [User, Questions, Answer, Question],
      synchronize: true,
      ssl: false,
    }),
    UserModule,
    QuestionsModule,
    SurveyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
