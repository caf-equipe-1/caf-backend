import { Module } from '@nestjs/common';
import { MainController } from '../../controllers/main/main.controller';
import { AppModule } from '../app/app.module';
import { CardModule } from '../card/card.module';
import { DocumentModule } from '../document/document.module';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AppModule, CardModule, DocumentModule, PasswordModule, UserModule],
  controllers: [MainController],
})
export class MainModule {}
