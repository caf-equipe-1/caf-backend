import { PasswordEntityInterface } from 'src/data/abstract/entities/password/password-entity-interface';
import { UpdatePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/updatePassword-usecase-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdatePasswordUsecase implements UpdatePasswordUsecaseInterface {
  private readonly passwordRepository: PasswordRepositoryInterface;
  private readonly passwordEntity: PasswordEntityInterface;

  public constructor(
    passwordRepository: PasswordRepositoryInterface,
    passwordEntity: PasswordEntityInterface,
  ) {
    this.passwordRepository = passwordRepository;
    this.passwordEntity = passwordEntity;
  }

  public async execute(
    passwordId: string,
    passwordDto: CreateOrUpdatePasswordType,
  ): Promise<Password> {
    const found = await this.passwordRepository.getOne(passwordId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const entity = this.passwordEntity;
    entity.setData(passwordDto);

    const updated = await this.passwordRepository.update(
      passwordId,
      entity.updateData(found),
    );

    return updated;
  }
}
