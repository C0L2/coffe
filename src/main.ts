import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { User } from './entities/user.entity';
import * as cors from 'cors';
import { Question } from './entities/survey-question.entity';
import { SurveyService } from './survey/survey.service';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  await app.listen(process.env.PORT || 9500);

  const userService = app.get(UserService);
  const surveyService = app.get(SurveyService)

  const admin = await userService.findOneByNickname('admin-sigma');

  if (!admin) {
    const newUser = new User();
    newUser.firstName = 'Samuel';
    newUser.lastName = 'Vacaras';
    newUser.nickname = 'admin-sigma';
    newUser.role = 'admin';

    const createdUser = await userService.create(newUser);
  }

  await surveyService.createQuestion("Считаешь ли ты настоящим счатьем жизнь с Богом?")

}
bootstrap();

