import { CreateAppControllerInterface } from 'src/presentation/abstract/controllers/app/createApp-controller-interface';
import { CreateAppController } from 'src/presentation/controllers/app/createApp-controller';

export function makeCreateAppFactory(): CreateAppControllerInterface {
  return new CreateAppController();
}
