import { AppEntity } from 'src/data/entities/app/app-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { FileHelper } from 'src/data/helpers/file/file-helper';
import { UpdateAppUsecase } from 'src/data/usecases/app/updateApp-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { AppRepository } from 'src/infra/repositories/app/app-repository';
import { UpdateAppControllerInterface } from 'src/presentation/abstract/controllers/app/updateApp-controller-interface';
import { UpdateAppController } from 'src/presentation/controllers/app/updateApp-controller';

export function makeUpdateAppControllerFactory(): UpdateAppControllerInterface {
  const database = new DatabaseConnection();
  const appRepository = new AppRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const fileHelper = new FileHelper();
  const appEntity = new AppEntity(idGenerator, fileHelper);
  const updateAppUsecase = new UpdateAppUsecase(appRepository, appEntity);

  return new UpdateAppController(updateAppUsecase);
}
