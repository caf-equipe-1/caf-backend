import { DeletePasswordUsecase } from 'src/data/usecases/password/deletePassword-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { PasswordRepository } from 'src/infra/repositories/password/password-repository';
import { DeletePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/deletePassword-controller-interface';
import { DeletePasswordController } from 'src/presentation/controllers/password/deletePassword-controller';

export function makeDeletePasswordControllerFactory(): DeletePasswordControllerInterface {
  const database = new DatabaseConnection();
  const passwordRepository = new PasswordRepository(database);
  const deletePasswordUsecase = new DeletePasswordUsecase(passwordRepository);

  return new DeletePasswordController(deletePasswordUsecase);
}
