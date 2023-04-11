import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { AuthMiddlewareInterface } from 'src/presentation/abstract/middleware/auth-middleware-interface';
import { AuthMiddleware } from 'src/presentation/middlewares/auth/auth-middleware';

export function makeAuthMiddlewareFactory(): AuthMiddlewareInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(userRepository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);

  return new AuthMiddleware(tokenHandler);
}
