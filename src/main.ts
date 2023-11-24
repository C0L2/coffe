import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { User } from './entities/user.entity';
import { SurveyService } from './survey/survey.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cors({
    origin: 'https://coffik.netlify.app',
    credentials: true
  }));

  await app.listen(process.env.PORT, '0.0.0.0');
  const userService = app.get(UserService);
  const surveyService = app.get(SurveyService)

  const admin = await userService.findOneByNickname(process.env.ADMIN_LOGIN_USENAME);

  if (!admin) {
    const newUser = new User();
    newUser.nickname = process.env.ADMIN_LOGIN_USENAME;
    newUser.role = 'admin';

    await userService.create(newUser);
  }

  await surveyService.createQuestion(process.env.SURVEY_QUESTION)

}
bootstrap();

