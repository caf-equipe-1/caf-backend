import { Module } from '@nestjs/common';
import { makeEmailLoginControllerFactory } from 'src/main/factories/controllers/login/emailLoginController-factory';
import { EmailLoginController } from 'src/presentation/controllers/login/emailLogin-controller';
import { MakeEmailLoginController } from '../../controllers/login/makeEmailLogin.controller';

@Module({
  controllers: [MakeEmailLoginController],
  providers: [
    {
      provide: EmailLoginController,
      useFactory: makeEmailLoginControllerFactory,
    },
  ],
})
export class EmailLoginModule {}
