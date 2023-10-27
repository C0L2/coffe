import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Questions } from './question.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    nickname: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    assignedNumber: number;

    @Column({ default: 'user' })
    role: string;
}
