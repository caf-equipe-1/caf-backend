import { HashAdapter } from 'src/data/helpers/adapters/hash/hash-adapter';
import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { MakeEmailLoginUseCase } from 'src/data/usecases/login/makeEmailLogin-usecase';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { EmailLoginControllerInterface } from 'src/presentation/abstract/controllers/login/emailLogin-controller-interface';
import { EmailLoginController } from 'src/presentation/controllers/login/emailLogin-controller';

export function makeEmailLoginControllerFactory(): EmailLoginControllerInterface {
  const database = new DatabaseConnection();
  const repository = new UserRepository(database);
  const hasher = new HashAdapter();
  const getOneUserUsecase = new GetOneUserUsecase(repository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);
  const makeEmailLoginUsecase = new MakeEmailLoginUseCase(
    repository,
    hasher,
    tokenHandler,
  );

  return new EmailLoginController(makeEmailLoginUsecase);
}
