import { Module } from '@nestjs/common';
import { MainController } from '../../controllers/main/main.controller';
import { AppModule } from '../app/app.module';
import { CardModule } from '../card/card.module';
import { DocumentModule } from '../document/document.module';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../../interceptors/response-interceptor';
import { EmailLoginModule } from '../login/emailLogin.module';
import { SelfieLoginModule } from '../login/selfieLogin.module';

@Module({
  imports: [
    AppModule,
    CardModule,
    DocumentModule,
    PasswordModule,
    UserModule,
    EmailLoginModule,
    SelfieLoginModule,
  ],
  controllers: [MainController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class MainModule {}
