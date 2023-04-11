import { UserEntity } from 'src/data/entities/user/user-entity';
import { HashAdapter } from 'src/data/helpers/adapters/hash/hash-adapter';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { UpdateUserUsecase } from 'src/data/usecases/user/updateUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { UpdateUserControllerInterface } from 'src/presentation/abstract/controllers/user/updateUser-controller-interface';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';

export function makeUpdateUserControllerFactory(): UpdateUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const hasher = new HashAdapter();
  const userEntity = new UserEntity(idGenerator, hasher);
  const updateUserUsecase = new UpdateUserUsecase(userRepository, userEntity);

  return new UpdateUserController(updateUserUsecase);
}
