import { PasswordEntityInterface } from 'src/data/abstract/entities/password/password-entity-interface';
import { CreatePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/createPassword-usecase-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';

export class CreatePasswordUsecase implements CreatePasswordUsecaseInterface {
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
    userId: string,
    passwordDto: CreateOrUpdatePasswordType,
  ): Promise<Password> {
    const enity = this.passwordEntity;
    enity.setData(passwordDto);
    enity.validate();

    const created = await this.passwordRepository.create(
      userId,
      enity.getBody(),
    );

    return created;
  }
}
