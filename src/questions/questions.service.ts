import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/dtos/create-question.dto';
import { error } from 'console';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Questions)
        private questionsRepository: Repository<Questions>,
    ) { }

    async getAll(): Promise<Questions[]> {
        return await this.questionsRepository.find();
    }

    async create(question: CreateQuestionDto): Promise<Questions> {
        return await this.questionsRepository.save(question);
    }

    async deleteById(id: number): Promise<void> {
        await this.questionsRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.questionsRepository.clear();
    }
}

