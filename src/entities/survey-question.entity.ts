import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from "./answer.entity"

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question_text: string;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}