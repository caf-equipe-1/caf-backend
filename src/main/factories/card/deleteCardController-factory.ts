import { DeleteCardUsecase } from 'src/data/usecases/card/deleteCard-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { CardRepository } from 'src/infra/repositories/card/card-repository';
import { DeleteCardControllerInterface } from 'src/presentation/abstract/controllers/card/deleteCard-controller-interface';
import { DeleteCardController } from 'src/presentation/controllers/card/deleteCard-controller';

export function makeDeleteCardFactory(): DeleteCardControllerInterface {
  const database = new DatabaseConnection();
  const cardRepository = new CardRepository(database);
  const deleteCardUsecase = new DeleteCardUsecase(cardRepository);

  return new DeleteCardController(deleteCardUsecase);
}
