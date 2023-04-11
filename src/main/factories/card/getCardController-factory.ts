import { GetCardControllerInterface } from 'src/presentation/abstract/controllers/card/getCard-controller-interface';
import { GetCardController } from 'src/presentation/controllers/card/getCard-controller';

export function makeGetCardFactory(): GetCardControllerInterface {
  return new GetCardController();
}
