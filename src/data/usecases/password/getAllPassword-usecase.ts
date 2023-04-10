import { GetAllPasswordsUsecaseInterface } from 'src/data/abstract/usecases/password/getAllPassword-usecase-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';

export class GetAllPasswordsUsecase implements GetAllPasswordsUsecaseInterface {
  private readonly passwordRepository: PasswordRepositoryInterface;

  public constructor(passwordRepository: PasswordRepositoryInterface) {
    this.passwordRepository = passwordRepository;
  }

  public async execute(userId: string): Promise<Password[]> {
    const found = await this.passwordRepository.getAll(userId);

    return found;
  }
}
