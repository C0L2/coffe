import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    assignedNumber: number;

    @Column({ default: 'user' })
    role: string;
}
