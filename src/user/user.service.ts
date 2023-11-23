import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => User))
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

    private assignedNumber = 1;
    private assignedNumberLock = false;

    async create(user: CreateUserDto) {
        const maxUsersPerNumber = 4;

        let assignedList = [];
        let currentNumber = 0;

        // Acquire lock
        if (!this.assignedNumberLock) {
            this.assignedNumberLock = true;

            do {
                currentNumber = this.assignedNumber;
                assignedList = await this.userRepository.find({ where: { assignedNumber: currentNumber } });

                if (assignedList.length >= maxUsersPerNumber) {
                    this.assignedNumber++;
                    if (this.assignedNumber > 9999) {
                        // Handle the case where all 4-digit numbers are assigned
                        throw new Error('All 4-digit numbers are assigned');
                    }
                }
            } while (assignedList.length >= maxUsersPerNumber);

            // Release lock
            this.assignedNumberLock = false;

            user.assignedNumber = currentNumber;
            return this.userRepository.save(user);
        } else {
            // Release lock
            this.assignedNumberLock = false;

            // Handle the case where the lock is already acquired
            throw new Error('Failed to acquire lock');
        }
    }

    async getNumarInregistrari() {
        return this.userRepository.count();
    }
}
