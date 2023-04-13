import { NestFactory } from '@nestjs/core';
import { EnvVariables } from './utils/env/envVariables-util';
import { MainModule } from './main/nest/modules/main/main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('FaceApp')
    .setDescription(
      'APi with nestJs as a framework and typescript as main development language',
    )
    .setVersion('1.0')
    .addTag('EmailLogin')
    .addTag('SelfieLogin')
    .addTag('Documents')
    .addTag('Apps')
    .addTag('Users')
    .addTag('Passwords')
    .addTag('Cards')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(EnvVariables.getPort());
}

bootstrap();
