import { CreatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/createPassword-controller-interface';
import { CreatePasswordController } from 'src/presentation/controllers/password/createPassword-controller';

export function makeCreatePasswordFactory(): CreatePasswordControllerInterface {
  return new CreatePasswordController();
}
