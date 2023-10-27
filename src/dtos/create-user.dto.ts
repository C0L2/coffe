import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    nickname: string;

    @IsString()
    phone: string;

    @IsString()
    role: string;

    @IsNumber()
    assignedNumber: number | null
}
