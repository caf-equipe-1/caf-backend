import { GetAllUsersUsecase } from 'src/data/usecases/user/getAllUser-usecase';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { GetUserControllerInterface } from 'src/presentation/abstract/controllers/user/getUser-controller-interface';
import { GetUserController } from 'src/presentation/controllers/user/getUser-controller';

export function makeGetUserControllerFactory(): GetUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(userRepository);
  const getAllUsersUseCase = new GetAllUsersUsecase(userRepository);

  return new GetUserController(getOneUserUsecase, getAllUsersUseCase);
}
