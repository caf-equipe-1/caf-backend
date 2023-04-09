import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/nest/modules/app.module';
import { config as envFileConfig } from 'dotenv';

async function bootstrap() {
  envFileConfig();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT || 7777);
}

bootstrap();
