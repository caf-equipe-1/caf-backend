import { UserEntity } from 'src/data/entities/user/user-entity';
import { FaceRegistrationAdapter } from 'src/data/helpers/adapters/auth/faceRegistration-adapter';
import { HashAdapter } from 'src/data/helpers/adapters/hash/hash-adapter';
import { HttpRequestAdapter } from 'src/data/helpers/adapters/httpRequest/httpRequest-adapter';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { UpdateUserUsecase } from 'src/data/usecases/user/updateUser-usecase';
import { GenerateUserImageLinkUsecase } from 'src/data/usecases/userImage/generateUserImageLink-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { TempImageRepository } from 'src/infra/repositories/tempImage/tempImage-repository';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { UpdateUserControllerInterface } from 'src/presentation/abstract/controllers/user/updateUser-controller-interface';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';

export function makeUpdateUserControllerFactory(): UpdateUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const hasher = new HashAdapter();
  const userEntity = new UserEntity(idGenerator, hasher);
  const tempImageRepository = new TempImageRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(userRepository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);
  const httpRequestAdapter = new HttpRequestAdapter();
  const faceRegistrationAdapter = new FaceRegistrationAdapter(
    tokenHandler,
    httpRequestAdapter,
  );
  const generateUserImageLinkUsecase = new GenerateUserImageLinkUsecase(
    tempImageRepository,
  );
  const updateUserUsecase = new UpdateUserUsecase(
    userRepository,
    userEntity,
    faceRegistrationAdapter,
    generateUserImageLinkUsecase,
  );

  return new UpdateUserController(updateUserUsecase);
}
