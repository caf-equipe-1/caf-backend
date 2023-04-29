import { UserEntity } from 'src/data/entities/user/user-entity';
import { FaceRegistrationAdapter } from 'src/data/helpers/adapters/auth/faceRegistration-adapter';
import { HashAdapter } from 'src/data/helpers/adapters/hash/hash-adapter';
import { HttpRequestAdapter } from 'src/data/helpers/adapters/httpRequest/httpRequest-adapter';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { CreateUserUsecase } from 'src/data/usecases/user/createUser-usecase';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { GenerateTempImageLinkUsecase } from 'src/data/usecases/tempImage/generateTempImageLink-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { TempImageRepository } from 'src/infra/repositories/tempImage/tempImage-repository';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { CreateUserControllerInterface } from 'src/presentation/abstract/controllers/user/createUser-controller-interface';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';
import { FileHelper } from 'src/data/helpers/file/file-helper';

export function makeCreateUserControllerFactory(): CreateUserControllerInterface {
  const database = new DatabaseConnection();
  const userRepository = new UserRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const hasher = new HashAdapter();
  const fileHelper = new FileHelper();
  const userEntity = new UserEntity(idGenerator, hasher, fileHelper);
  const tempImageRepository = new TempImageRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(userRepository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);
  const httpRequestAdapter = new HttpRequestAdapter();
  const faceRegistrationAdapter = new FaceRegistrationAdapter(
    tokenHandler,
    httpRequestAdapter,
  );
  const generateTempImageLinkUsecase = new GenerateTempImageLinkUsecase(
    tempImageRepository,
  );
  const createUserUsecase = new CreateUserUsecase(
    userRepository,
    userEntity,
    faceRegistrationAdapter,
    generateTempImageLinkUsecase,
  );

  return new CreateUserController(createUserUsecase);
}
