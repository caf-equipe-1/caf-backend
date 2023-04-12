import { Module } from '@nestjs/common';
import { makeCreateUserControllerFactory } from 'src/main/factories/controllers/user/createUserController-factory';
import { makeDeleteUserControllerFactory } from 'src/main/factories/controllers/user/deleteUserController-factory';
import { makeGetUserControllerFactory } from 'src/main/factories/controllers/user/getUserController-factory';
import { makeUpdateUserControllerFactory } from 'src/main/factories/controllers/user/updateUserController-factory';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';
import { DeleteUserController } from 'src/presentation/controllers/user/deleteUser-controller';
import { GetUserController } from 'src/presentation/controllers/user/getUser-controller';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';
import { UserController } from '../../controllers/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserController,
      useFactory: makeCreateUserControllerFactory,
    },
    {
      provide: UpdateUserController,
      useFactory: makeUpdateUserControllerFactory,
    },
    {
      provide: DeleteUserController,
      useFactory: makeDeleteUserControllerFactory,
    },
    {
      provide: GetUserController,
      useFactory: makeGetUserControllerFactory,
    },
  ],
})
export class UserModule {}
