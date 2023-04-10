import { GetAllUsersUsecaseInterface } from 'src/data/abstract/usecases/user/getAllUser-usecase-interface';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';

export class GetAllUsersUsecase implements GetAllUsersUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;

  public constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const found = await this.userRepository.getAll();

    return found;
  }
}
