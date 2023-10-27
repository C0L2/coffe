import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from "./survey-question.entity"

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer_text: string;

  @Column()
  is_pro: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}