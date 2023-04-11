import { CardEntity } from 'src/data/entities/card/card-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { UpdateCardUsecase } from 'src/data/usecases/card/updateCard-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { CardRepository } from 'src/infra/repositories/card/card-repository';
import { UpdateCardControllerInterface } from 'src/presentation/abstract/controllers/card/updateCard-controller-interface';
import { UpdateCardController } from 'src/presentation/controllers/card/updateCard-controller';

export function makeUpdateCardFactory(): UpdateCardControllerInterface {
  const database = new DatabaseConnection();
  const cardRepository = new CardRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const cardEntity = new CardEntity(idGenerator);
  const updateCardUsecase = new UpdateCardUsecase(cardRepository, cardEntity);

  return new UpdateCardController(updateCardUsecase);
}
