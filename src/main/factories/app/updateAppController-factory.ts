import { UpdateAppControllerInterface } from 'src/presentation/abstract/controllers/app/updateApp-controller-interface';
import { UpdateAppController } from 'src/presentation/controllers/app/updateApp-controller';

export function makeUpdateAppFactory(): UpdateAppControllerInterface {
  return new UpdateAppController();
}
