import { AppEntity } from 'src/data/entities/app/app-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { CreateAppUsecase } from 'src/data/usecases/app/createApp-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { AppRepository } from 'src/infra/repositories/app/app-repository';
import { CreateAppControllerInterface } from 'src/presentation/abstract/controllers/app/createApp-controller-interface';
import { CreateAppController } from 'src/presentation/controllers/app/createApp-controller';

export function makeCreateAppFactory(): CreateAppControllerInterface {
  const database = new DatabaseConnection();
  const appRepository = new AppRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const appEntity = new AppEntity(idGenerator);
  const createAppUsecase = new CreateAppUsecase(appRepository, appEntity);

  return new CreateAppController(createAppUsecase);
}
