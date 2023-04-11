import { DeleteCardControllerInterface } from 'src/presentation/abstract/controllers/card/deleteCard-controller-interface';
import { DeleteCardController } from 'src/presentation/controllers/card/deleteCard-controller';

export function makeDeleteCardFactory(): DeleteCardControllerInterface {
  return new DeleteCardController();
}
