import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Questions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    nickname: string;
}
