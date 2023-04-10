import { DeletePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/deletePassword-usecase-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class DeletePasswordUsecase implements DeletePasswordUsecaseInterface {
  private readonly passwordRepository: PasswordRepositoryInterface;

  public constructor(passwordRepository: PasswordRepositoryInterface) {
    this.passwordRepository = passwordRepository;
  }

  public async execute(passwordId: string): Promise<Password> {
    const found = await this.passwordRepository.getOne(passwordId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const deleted = await this.passwordRepository.delete(passwordId);

    return deleted;
  }
}
