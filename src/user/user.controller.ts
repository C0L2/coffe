import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('numar-inregistrari')
    async getNumarInregistrari() {
        return this.userService.getNumarInregistrari();
    }

    @Get('all-users')
    findAll() {
        return this.userService.findAll();
    }

    @Post('find-by-nickanme')
    async fidnByNickname(@Body() body: { nickname: string }) {
        const user = await this.userService.findOneByNickname(body.nickname)
        return user
    }

    @Post('create-user')
    async create(@Body() body: CreateUserDto) {
        const user = await this.userService.findOneByNickname(body.nickname)

        if (user) return { message: 'This nickname is already taken' }

        body.role = 'user'
        this.userService.create(body)
        return { message: 'Added new user', user: body }
    }
    w
}
