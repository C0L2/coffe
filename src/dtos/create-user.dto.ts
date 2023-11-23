import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    nickname: string;

    @IsString()
    phone: string;

    @IsString()
    role: string;

    @IsNumber()
    assignedNumber: number | null
}
