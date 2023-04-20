import { NestFactory } from '@nestjs/core';
import { EnvVariables } from './utils/env/envVariables-util';
import { MainModule } from './main/nest/modules/main/main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('FaceApp')
    .setDescription('APi made with Typescript and NestJS.')
    .setVersion('1.0.0')
    .addTag('Main')
    .addTag('EmailLogin')
    .addTag('SelfieLogin')
    .addTag('Documents')
    .addTag('Apps')
    .addTag('Users')
    .addTag('Passwords')
    .addTag('Cards')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(EnvVariables.getPort());
}

bootstrap();
