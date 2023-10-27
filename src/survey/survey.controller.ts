import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Question } from 'src/entities/survey-question.entity';
import { Answer } from 'src/entities/answer.entity';

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) { }

    @Get('questions')
    async getQuestions(): Promise<Question[]> {
        return this.surveyService.getQuestions();
    }

    @Post('questions')
    async createQuestion(@Body() questionData: { question_text: string }): Promise<Question> {
        return this.surveyService.createQuestion(questionData.question_text);
    }

    @Post('answers')
    async submitAnswers(@Body() answers: Answer[]): Promise<Answer[]> {
        return this.surveyService.submitAnswers(answers);
    }

    @Get('results')
    async getSurveyResults(): Promise<any[]> {
        return this.surveyService.calculateSurveyResults();
    }

    @Get('/:id')
    async getSurveyById(@Param('id') id: string) {
        const surveyId = parseInt(id, 10);
        const survey = await this.surveyService.getSurveyById(surveyId);
        if (!survey) {
            throw new NotFoundException(`Survey with id ${surveyId} was not found`);
        }
        return survey;
    }
}
