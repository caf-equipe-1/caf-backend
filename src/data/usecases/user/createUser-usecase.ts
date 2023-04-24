import { UserEntityInterface } from 'src/data/abstract/entities/user/user-entity-interface';
import { CreateUserUsecaseInterface } from 'src/data/abstract/usecases/user/createUser-usecase-interface';
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class CreateUserUsecase implements CreateUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly userEntity: UserEntityInterface;

  public constructor(
    userRepository: UserRepositoryInterface,
    userEntity: UserEntityInterface,
  ) {
    this.userRepository = userRepository;
    this.userEntity = userEntity;
  }

  public async execute(userDto: CreateProfileDto): Promise<User> {
    const enity = this.userEntity;
    enity.setData(userDto);
    enity.validate();

    const foundUserByEmail = await this.userRepository.getOneByEmail(
      userDto.email,
    );

    if (foundUserByEmail) {
      throw new InvalidParamError('Email already registered');
    }

    const foundUserByCpf = await this.userRepository.getOneByCpf(userDto.cpf);

    if (foundUserByCpf) {
      throw new InvalidParamError('Cpf already registered');
    }

    const created = await this.userRepository.create(enity.getBody());

    return created;
  }
}
