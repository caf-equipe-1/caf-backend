import { UserEntityInterface } from 'src/data/abstract/entities/user/user-entity-interface';
import { FaceRegistrationAdapterInterface } from 'src/data/abstract/helpers/adapters/auth/faceRegistration-adapter-interface';
import { CreateUserUsecaseInterface } from 'src/data/abstract/usecases/user/createUser-usecase-interface';
import { GenerateUserImageLinkUsecaseInterface } from 'src/data/abstract/usecases/userImage/generateUserImageLink-usecase-interface';
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class CreateUserUsecase implements CreateUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly userEntity: UserEntityInterface;
  private readonly faceRegistrationAdapter: FaceRegistrationAdapterInterface;
  private readonly generateUserImageLinkUsecase: GenerateUserImageLinkUsecaseInterface;

  public constructor(
    userRepository: UserRepositoryInterface,
    userEntity: UserEntityInterface,
    faceRegistrationAdapter: FaceRegistrationAdapterInterface,
    generateUserImageLinkUsecase: GenerateUserImageLinkUsecaseInterface,
  ) {
    this.userRepository = userRepository;
    this.userEntity = userEntity;
    this.faceRegistrationAdapter = faceRegistrationAdapter;
    this.generateUserImageLinkUsecase = generateUserImageLinkUsecase;
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

    const tempImageLink = await this.generateUserImageLinkUsecase.execute(
      created.id,
      created.photo,
    );

    const apiRegister = await this.faceRegistrationAdapter.registrate({
      peopleId: created.cpf,
      imageUrl: tempImageLink,
    });

    return created;
  }
}
