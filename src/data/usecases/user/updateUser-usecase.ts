import { UserEntityInterface } from 'src/data/abstract/entities/user/user-entity-interface';
import { UpdateUserUsecaseInterface } from 'src/data/abstract/usecases/user/updateUser-usecase-interface';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdateUserUsecase implements UpdateUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly userEntity: UserEntityInterface;

  public constructor(
    userRepository: UserRepositoryInterface,
    userEntity: UserEntityInterface,
  ) {
    this.userRepository = userRepository;
    this.userEntity = userEntity;
  }

  public async execute(
    userId: string,
    userDto: UpdateProfileDto,
  ): Promise<User> {
    const found = await this.userRepository.getOne(userId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const entity = this.userEntity;
    entity.setData(userDto);

    const updated = await this.userRepository.update(
      userId,
      entity.updateData(found),
    );

    return updated;
  }
}
