import { GetUserImageUsecaseInterface } from 'src/data/abstract/usecases/userImage/getUserImage-usecase-interface';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetUserImageUsecase implements GetUserImageUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;

  public constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<string> {
    const foundUser = this.userRepository.getOneById(userId);

    if (!foundUser) {
      throw new InvalidParamError('Id');
    }

    return (await foundUser).photo;
  }
}
