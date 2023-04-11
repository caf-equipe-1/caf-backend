import { GetPasswordControllerInterface } from 'src/presentation/abstract/controllers/password/getPassword-controller-interface';
import { GetPasswordController } from 'src/presentation/controllers/password/getPassword-controller';

export function makeGetPasswordFactory(): GetPasswordControllerInterface {
  return new GetPasswordController();
}
