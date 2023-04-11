import { GetAppControllerInterface } from 'src/presentation/abstract/controllers/app/getApp-controller-interface';
import { GetAppController } from 'src/presentation/controllers/app/getApp-controller';

export function makeGetAppFactory(): GetAppControllerInterface {
  return new GetAppController();
}
