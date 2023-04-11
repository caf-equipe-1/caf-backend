import { UpdateCardControllerInterface } from 'src/presentation/abstract/controllers/card/updateCard-controller-interface';
import { UpdateCardController } from 'src/presentation/controllers/card/updateCard-controller';

export function makeUpdateCardFactory(): UpdateCardControllerInterface {
  return new UpdateCardController();
}
