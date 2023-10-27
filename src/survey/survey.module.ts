import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/survey-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule { }
