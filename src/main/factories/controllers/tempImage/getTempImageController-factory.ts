import { FileHelper } from 'src/data/helpers/file/file-helper';
import { GetTempImageUsecase } from 'src/data/usecases/tempImage/getTempImage-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { TempImageRepository } from 'src/infra/repositories/tempImage/tempImage-repository';
import { GetTempImageControllerInterface } from 'src/presentation/abstract/controllers/tempImage/getTempImage-controller-interface';
import { GetTempImageController } from 'src/presentation/controllers/tempImage/getTempImage-controller';

export function makeGetTempImageControllerFactory(): GetTempImageControllerInterface {
  const database = new DatabaseConnection();
  const tempImageRepository = new TempImageRepository(database);
  const fileHelper = new FileHelper();
  const getTempImageUsecase = new GetTempImageUsecase(
    tempImageRepository,
    fileHelper,
  );

  return new GetTempImageController(getTempImageUsecase);
}
