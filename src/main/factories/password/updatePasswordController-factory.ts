import { UpdatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/updatePassword-controller-interface';
import { UpdatePasswordController } from 'src/presentation/controllers/password/updatePassword-controller';

export function makeUpdatePasswordFactory(): UpdatePasswordControllerInterface {
  return new UpdatePasswordController();
}
