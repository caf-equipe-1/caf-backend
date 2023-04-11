import { DeleteUserControllerInterface } from 'src/presentation/abstract/controllers/user/deleteUser-controller-interface';
import { DeleteUserController } from 'src/presentation/controllers/user/deleteUser-controller';

export function makeDeleteUserFactory(): DeleteUserControllerInterface {
  return new DeleteUserController();
}
