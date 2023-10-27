import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from 'src/dtos/create-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private qSer: QuestionsService) { }

    @Get('all')
    async getNumarInregistrari() {
        return this.qSer.getAll();
    }

    @Post('create-question')
    async create(@Body() body: CreateQuestionDto) {
        await this.qSer.create(body)
        return { message: 'Added new question', question: body }
    }

    @Delete(':id')
    async deleteQuestion(@Param('id') id: number) {
        await this.qSer.deleteById(id);
        return { message: 'Deleted question with ID ' + id };
    }
}
