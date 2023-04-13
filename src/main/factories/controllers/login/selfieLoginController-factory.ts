import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { MakeSelfieLoginUseCase } from 'src/data/usecases/login/makeSelfieLogin-usecase';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { SelfieLoginControllerInterface } from 'src/presentation/abstract/controllers/login/selfieLogin-controller-interface';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';

export function makeSelfieLoginControllerFactory(): SelfieLoginControllerInterface {
  const database = new DatabaseConnection();
  const repository = new UserRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(repository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);
  const makeSelfieLoginUsecase = new MakeSelfieLoginUseCase(
    repository,
    tokenHandler,
  );

  return new SelfieLoginController(makeSelfieLoginUsecase);
}
