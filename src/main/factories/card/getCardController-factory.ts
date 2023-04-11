import { GetAllCardsUsecase } from 'src/data/usecases/card/getAllCards-usecase';
import { GetOneCardUsecase } from 'src/data/usecases/card/getOneCard-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { CardRepository } from 'src/infra/repositories/card/card-repository';
import { GetCardControllerInterface } from 'src/presentation/abstract/controllers/card/getCard-controller-interface';
import { GetCardController } from 'src/presentation/controllers/card/getCard-controller';

export function makeGetCardFactory(): GetCardControllerInterface {
  const database = new DatabaseConnection();
  const cardRepository = new CardRepository(database);
  const getOneCardUsecase = new GetOneCardUsecase(cardRepository);
  const getAllCardsUseCase = new GetAllCardsUsecase(cardRepository);

  return new GetCardController(getOneCardUsecase, getAllCardsUseCase);
}
