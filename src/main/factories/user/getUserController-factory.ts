import { GetUserControllerInterface } from 'src/presentation/abstract/controllers/user/getUser-controller-interface';
import { GetUserController } from 'src/presentation/controllers/user/getUser-controller';

export function makeGetUserFactory(): GetUserControllerInterface {
  return new GetUserController();
}
