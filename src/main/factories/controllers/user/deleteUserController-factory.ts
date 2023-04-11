import { DeleteUserUsecase } from 'src/data/usecases/user/deleteUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { DeleteUserControllerInterface } from 'src/presentation/abstract/controllers/user/deleteUser-controller-interface';
import { DeleteUserController } from 'src/presentation/controllers/user/deleteUser-controller';

export function makeDeleteUserControllerFactory(): DeleteUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const deleteUserUsecase = new DeleteUserUsecase(userRepository);

  return new DeleteUserController(deleteUserUsecase);
}
