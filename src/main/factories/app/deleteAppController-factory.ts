import { DeleteAppUsecase } from 'src/data/usecases/app/deleteApp-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { AppRepository } from 'src/infra/repositories/app/app-repository';
import { DeleteAppControllerInterface } from 'src/presentation/abstract/controllers/app/deleteApp-controller-interface';
import { DeleteAppController } from 'src/presentation/controllers/app/deleteApp-controller';

export function makeDeleteAppFactory(): DeleteAppControllerInterface {
  const database = new DatabaseConnection();
  const appRepository = new AppRepository(database);
  const deleteAppUsecase = new DeleteAppUsecase(appRepository);

  return new DeleteAppController(deleteAppUsecase);
}
