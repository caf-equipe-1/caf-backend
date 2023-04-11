import { CardEntity } from 'src/data/entities/card/card-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { CreateCardUsecase } from 'src/data/usecases/card/createCard-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { CardRepository } from 'src/infra/repositories/card/card-repository';
import { CreateCardControllerInterface } from 'src/presentation/abstract/controllers/card/createCard-controller-interface';
import { CreateCardController } from 'src/presentation/controllers/card/createCard-controller';

export function makeCreateCardControllerFactory(): CreateCardControllerInterface {
  const database = new DatabaseConnection();
  const cardRepository = new CardRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const cardEntity = new CardEntity(idGenerator);
  const createCardUsecase = new CreateCardUsecase(cardRepository, cardEntity);

  return new CreateCardController(createCardUsecase);
}
