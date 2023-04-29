import { UserEntityInterface } from 'src/data/abstract/entities/user/user-entity-interface';
import { FaceRegistrationAdapterInterface } from 'src/data/abstract/helpers/adapters/auth/faceRegistration-adapter-interface';
import { UpdateUserUsecaseInterface } from 'src/data/abstract/usecases/user/updateUser-usecase-interface';
import { GenerateTempImageLinkUsecaseInterface } from 'src/data/abstract/usecases/tempImage/generateTempImageLink-usecase-interface';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdateUserUsecase implements UpdateUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly userEntity: UserEntityInterface;
  private readonly faceRegistrationAdapter: FaceRegistrationAdapterInterface;
  private readonly generateTempImageLinkUsecase: GenerateTempImageLinkUsecaseInterface;

  public constructor(
    userRepository: UserRepositoryInterface,
    userEntity: UserEntityInterface,
    faceRegistrationAdapter: FaceRegistrationAdapterInterface,
    generateTempImageLinkUsecase: GenerateTempImageLinkUsecaseInterface,
  ) {
    this.userRepository = userRepository;
    this.userEntity = userEntity;
    this.faceRegistrationAdapter = faceRegistrationAdapter;
    this.generateTempImageLinkUsecase = generateTempImageLinkUsecase;
  }

  public async execute(
    userId: string,
    userDto: UpdateProfileDto,
  ): Promise<User> {
    const found = await this.userRepository.getOneById(userId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    if (userDto.cpf) {
      const foundByCpf = await this.userRepository.getOneByCpf(userDto.cpf);

      if (foundByCpf && foundByCpf.id !== found.id) {
        throw new InvalidParamError('Cpf already registered');
      }
    }

    if (userDto.email) {
      const foundByEmail = await this.userRepository.getOneByEmail(
        userDto.email,
      );

      if (foundByEmail && foundByEmail.id !== found.id) {
        throw new InvalidParamError('Email already registered');
      }
    }

    const entity = this.userEntity;
    entity.setData(userDto);
    entity.validateUpdate();

    const updated = await this.userRepository.update(
      userId,
      entity.updateData(found),
    );

    const tempImageLink = await this.generateTempImageLinkUsecase.execute(
      updated.photo,
    );

    const apiRegister = await this.faceRegistrationAdapter.registrate({
      peopleId: updated.cpf,
      imageUrl: tempImageLink,
    });

    return updated;
  }
}
