import { NestFactory } from '@nestjs/core';
import { EnvVariables } from './utils/env/envVariables-util';
import { MainModule } from './main/nest/modules/main/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors();

  await app.listen(EnvVariables.getPort());
}

bootstrap();
