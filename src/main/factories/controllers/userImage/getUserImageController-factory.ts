import { GetUserImageUsecase } from 'src/data/usecases/userImage/getUserImage-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { GetUserImageControllerInterface } from 'src/presentation/abstract/controllers/userImage/getUserImage-controller-interface';
import { GetUserImageController } from 'src/presentation/controllers/userImage/getUserImage-controller';

export function makeGetUserImageControllerFactory(): GetUserImageControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const getUserImageUsecase = new GetUserImageUsecase(userRepository);

  return new GetUserImageController(getUserImageUsecase);
}
