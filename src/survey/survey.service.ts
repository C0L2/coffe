import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/survey-question.entity';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
    ) { }

    async getQuestions(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    async deleteAllQuestions() {
        return await this.questionRepository.delete({})
    }

    async createQuestion(questionText: string): Promise<Question> {
        const newQuestion = this.questionRepository.create({ question_text: questionText });
        return this.questionRepository.save(newQuestion);
    }

    async submitAnswers(answers: Answer[]): Promise<Answer[]> {
        return this.answerRepository.save(answers);
    }

    async calculateSurveyResults(): Promise<any[]> {
        const questions = await this.questionRepository.find({ relations: ['answers'] });

        const surveyResults = [];

        for (const question of questions) {
            const proCount = question.answers.filter((answer) => answer.is_pro).length;
            const contraCount = question.answers.filter((answer) => !answer.is_pro).length;

            surveyResults.push({
                question: question.question_text,
                proCount,
                contraCount,
            });
        }

        return surveyResults;
    }

    async getSurveyById(surveyId: number) {
        const questions = await this.questionRepository.find({ relations: ['answers'] });
        const surveyQuestions = questions.filter((question) => question.id === surveyId);

        if (surveyQuestions.length === 0) {
            return null;
        }

        const results = surveyQuestions.map((question) => {
            const totalVotes = question.answers.length;
            const proVotes = question.answers.filter((answer) => answer.is_pro).length;
            const contraVotes = totalVotes - proVotes;
            const proPercentage = ((proVotes / totalVotes) * 100).toFixed(2);
            const contraPercentage = ((contraVotes / totalVotes) * 100).toFixed(2);

            return {
                proVotes,
                contraVotes,
                proPercentage,
                contraPercentage,
            };
        });

        return results;
    }


}
