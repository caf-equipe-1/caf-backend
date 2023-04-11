import { GetAllPasswordsUsecase } from 'src/data/usecases/password/getAllPassword-usecase';
import { GetOnePasswordUsecase } from 'src/data/usecases/password/getOnePassword-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { PasswordRepository } from 'src/infra/repositories/password/password-repository';
import { GetPasswordControllerInterface } from 'src/presentation/abstract/controllers/password/getPassword-controller-interface';
import { GetPasswordController } from 'src/presentation/controllers/password/getPassword-controller';

export function makeGetPasswordFactory(): GetPasswordControllerInterface {
  const database = new DatabaseConnection();
  const passwordRepository = new PasswordRepository(database);
  const getAllPasswordsUseCase = new GetAllPasswordsUsecase(passwordRepository);
  const getOnePasswordUsecase = new GetOnePasswordUsecase(passwordRepository);

  return new GetPasswordController(
    getOnePasswordUsecase,
    getAllPasswordsUseCase,
  );
}
