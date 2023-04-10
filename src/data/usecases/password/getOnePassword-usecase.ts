import { GetOnePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/getOnePassword-usecase-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetOnePasswordUsecase implements GetOnePasswordUsecaseInterface {
  private readonly passwordRepository: PasswordRepositoryInterface;

  public constructor(passwordRepository: PasswordRepositoryInterface) {
    this.passwordRepository = passwordRepository;
  }

  public async execute(passwordId: string): Promise<Password> {
    const found = await this.passwordRepository.getOne(passwordId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    return found;
  }
}
