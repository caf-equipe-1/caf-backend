import { Module } from '@nestjs/common';
import { makeSelfieLoginControllerFactory } from 'src/main/factories/controllers/login/selfieloginController-factory';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';
import { MakeSelfieLoginController } from '../../controllers/login/makeSelfieLogin.controller';

@Module({
  controllers: [MakeSelfieLoginController],
  providers: [
    {
      provide: SelfieLoginController,
      useFactory: makeSelfieLoginControllerFactory,
    },
  ],
})
export class SelfieLoginModule {}
