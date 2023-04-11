import { UpdateUserControllerInterface } from 'src/presentation/abstract/controllers/user/updateUser-controller-interface';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';

export function makeUpdateUserFactory(): UpdateUserControllerInterface {
  return new UpdateUserController();
}
