import { PasswordEntity } from 'src/data/entities/password/password-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { CreatePasswordUsecase } from 'src/data/usecases/password/createPassword-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { PasswordRepository } from 'src/infra/repositories/password/password-repository';
import { CreatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/createPassword-controller-interface';
import { CreatePasswordController } from 'src/presentation/controllers/password/createPassword-controller';

export function makeCreatePasswordControllerFactory(): CreatePasswordControllerInterface {
  const database = new DatabaseConnection();
  const passwordRepository = new PasswordRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const passwordEntity = new PasswordEntity(idGenerator);
  const createPasswordUsecase = new CreatePasswordUsecase(
    passwordRepository,
    passwordEntity,
  );

  return new CreatePasswordController(createPasswordUsecase);
}
