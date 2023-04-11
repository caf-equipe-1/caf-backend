import { GetAllAppsUsecase } from 'src/data/usecases/app/getAllApps-usecase';
import { GetOneAppUsecase } from 'src/data/usecases/app/getOneApp-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { AppRepository } from 'src/infra/repositories/app/app-repository';
import { GetAppControllerInterface } from 'src/presentation/abstract/controllers/app/getApp-controller-interface';
import { GetAppController } from 'src/presentation/controllers/app/getApp-controller';

export function makeGetAppFactory(): GetAppControllerInterface {
  const database = new DatabaseConnection();
  const appRepository = new AppRepository(database);
  const getOneAppUsecase = new GetOneAppUsecase(appRepository);
  const getAllAppsUseCase = new GetAllAppsUsecase(appRepository);

  return new GetAppController(getOneAppUsecase, getAllAppsUseCase);
}
