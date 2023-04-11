import { CreateUserControllerInterface } from 'src/presentation/abstract/controllers/user/createUser-controller-interface';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';

export function makeCreateUserFactory(): CreateUserControllerInterface {
  return new CreateUserController();
}
