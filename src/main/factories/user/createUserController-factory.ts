import { UserEntity } from 'src/data/entities/user/user-entity';
import { HashAdapter } from 'src/data/helpers/adapters/hash/hash-adapter';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { CreateUserUsecase } from 'src/data/usecases/user/createUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { CreateUserControllerInterface } from 'src/presentation/abstract/controllers/user/createUser-controller-interface';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';

export function makeCreateUserFactory(): CreateUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const hasher = new HashAdapter();
  const userEntity = new UserEntity(idGenerator, hasher);
  const createUserUsecase = new CreateUserUsecase(userRepository, userEntity);

  return new CreateUserController(createUserUsecase);
}
