import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByNickname(nickname: any): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { nickname } });
    }

    assignedNumber = 1;

    async create(user: CreateUserDto) {
        var assignedList = []
        var assignedNumber = this.assignedNumber
        assignedList = await this.userRepository.find({ where: { assignedNumber } });
        if (assignedList.length >= 4) {
            this.assignedNumber++
            user.assignedNumber = this.assignedNumber
            return this.userRepository.save(user)
        } else {
            user.assignedNumber = this.assignedNumber
            return this.userRepository.save(user)
        }

    }

    async getNumarInregistrari() {
        return this.userRepository.count();
    }
}
