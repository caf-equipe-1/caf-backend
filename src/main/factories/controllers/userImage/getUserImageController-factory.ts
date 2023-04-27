import { GetUserImageUsecase } from 'src/data/usecases/userImage/getUserImage-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { TempImageRepository } from 'src/infra/repositories/tempImage/tempImage-repository';
import { GetUserImageControllerInterface } from 'src/presentation/abstract/controllers/userImage/getUserImage-controller-interface';
import { GetUserImageController } from 'src/presentation/controllers/userImage/getUserImage-controller';

export function makeGetUserImageControllerFactory(): GetUserImageControllerInterface {
  const database = new DatabaseConnection();
  const tempImageRepository = new TempImageRepository(database);
  const getUserImageUsecase = new GetUserImageUsecase(tempImageRepository);

  return new GetUserImageController(getUserImageUsecase);
}
