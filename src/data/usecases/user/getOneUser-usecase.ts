import { GetOneUserUsecaseInterface } from 'src/data/abstract/usecases/user/getOneUser-usecase-interface';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetOneUserUsecase implements GetOneUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;

  public constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<User> {
    const found = await this.userRepository.getOne(userId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    return found;
  }
}
