import { DeletePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/deletePassword-controller-interface';
import { DeletePasswordController } from 'src/presentation/controllers/password/deletePassword-controller';

export function makeDeletePasswordFactory(): DeletePasswordControllerInterface {
  return new DeletePasswordController();
}
