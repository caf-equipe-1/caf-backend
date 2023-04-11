import { DeleteAppControllerInterface } from 'src/presentation/abstract/controllers/app/deleteApp-controller-interface';
import { DeleteAppController } from 'src/presentation/controllers/app/deleteApp-controller';

export function makeDeleteAppFactory(): DeleteAppControllerInterface {
  return new DeleteAppController();
}
