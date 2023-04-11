import { CreateCardControllerInterface } from 'src/presentation/abstract/controllers/card/createCard-controller-interface';
import { CreateCardController } from 'src/presentation/controllers/card/createCard-controller';

export function makeCreateCardFactory(): CreateCardControllerInterface {
  return new CreateCardController();
}
