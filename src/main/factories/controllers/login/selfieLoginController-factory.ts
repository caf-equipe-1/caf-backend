import { TokenHandlerAdapter } from 'src/data/helpers/adapters/tokenHandler/tokenHandler-adapter';
import { MakeSelfieLoginUseCase } from 'src/data/usecases/login/makeSelfieLogin-usecase';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { GenerateTempImageLinkUsecase } from 'src/data/usecases/tempImage/generateTempImageLink-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { TempImageRepository } from 'src/infra/repositories/tempImage/tempImage-repository';
import { UserRepository } from 'src/infra/repositories/user/user-repository';
import { SelfieLoginControllerInterface } from 'src/presentation/abstract/controllers/login/selfieLogin-controller-interface';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';
import { FileHelper } from 'src/data/helpers/file/file-helper';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';

export function makeSelfieLoginControllerFactory(): SelfieLoginControllerInterface {
  const database = new DatabaseConnection();
  const repository = new UserRepository(database);
  const tempImageRepository = new TempImageRepository(database);
  const getOneUserUsecase = new GetOneUserUsecase(repository);
  const tokenHandler = new TokenHandlerAdapter(getOneUserUsecase);
  const fileHelper = new FileHelper();
  const idGeneratorAdapter = new IdGeneratorAdapter();
  const generateTempImageLinkUsecase = new GenerateTempImageLinkUsecase(
    tempImageRepository,
    idGeneratorAdapter,
  );
  const makeSelfieLoginUsecase = new MakeSelfieLoginUseCase(
    repository,
    tokenHandler,
    generateTempImageLinkUsecase,
    fileHelper,
  );

  return new SelfieLoginController(makeSelfieLoginUsecase);
}
