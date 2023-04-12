import { Module } from '@nestjs/common';
import { makeCreatePasswordControllerFactory } from 'src/main/factories/controllers/password/createPasswordController-factory';
import { makeDeletePasswordControllerFactory } from 'src/main/factories/controllers/password/deletePasswordController-factory';
import { makeGetPasswordControllerFactory } from 'src/main/factories/controllers/password/getPasswordController-factory';
import { makeUpdatePasswordControllerFactory } from 'src/main/factories/controllers/password/updatePasswordController-factory';
import { CreatePasswordController } from 'src/presentation/controllers/password/createPassword-controller';
import { DeletePasswordController } from 'src/presentation/controllers/password/deletePassword-controller';
import { GetPasswordController } from 'src/presentation/controllers/password/getPassword-controller';
import { UpdatePasswordController } from 'src/presentation/controllers/password/updatePassword-controller';
import { PasswordController } from '../../controllers/password/password.controller';

@Module({
  controllers: [PasswordController],
  providers: [
    {
      provide: CreatePasswordController,
      useFactory: makeCreatePasswordControllerFactory,
    },
    {
      provide: UpdatePasswordController,
      useFactory: makeUpdatePasswordControllerFactory,
    },
    {
      provide: DeletePasswordController,
      useFactory: makeDeletePasswordControllerFactory,
    },
    {
      provide: GetPasswordController,
      useFactory: makeGetPasswordControllerFactory,
    },
  ],
})
export class PasswordModule {}
