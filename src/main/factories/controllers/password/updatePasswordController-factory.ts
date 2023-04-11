import { PasswordEntity } from 'src/data/entities/password/password-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { UpdatePasswordUsecase } from 'src/data/usecases/password/updatePassword-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { PasswordRepository } from 'src/infra/repositories/password/password-repository';
import { UpdatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/updatePassword-controller-interface';
import { UpdatePasswordController } from 'src/presentation/controllers/password/updatePassword-controller';

export function makeUpdatePasswordControllerFactory(): UpdatePasswordControllerInterface {
  const database = new DatabaseConnection();
  const passwordRepository = new PasswordRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const passwordEntity = new PasswordEntity(idGenerator);
  const updatePasswordUsecase = new UpdatePasswordUsecase(
    passwordRepository,
    passwordEntity,
  );

  return new UpdatePasswordController(updatePasswordUsecase);
}
