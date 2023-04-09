import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/nest/modules/app.module';
import { EnvVariables } from './utils/env/envVariables-util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(EnvVariables.getPort());
}

bootstrap();
