import { FaceAuthenticationAdapterInterface } from 'src/data/abstract/helpers/adapters/auth/faceAuthentication-adapter-interface';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/tokenHandler/tokenHandler-adapter-interface';
import { MakeSelfieLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeSelfieLogin-usecase-interface';
import { GenerateUserImageLinkUsecaseInterface } from 'src/data/abstract/usecases/userImage/generateUserImageLink-usecase-interface';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class MakeSelfieLoginUseCase implements MakeSelfieLoginUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly tokenHandler: TokenHandlerAdapterInterface;
  private readonly faceAuthentication: FaceAuthenticationAdapterInterface;
  private readonly generateUserImageLinkUsecase: GenerateUserImageLinkUsecaseInterface;

  public constructor(
    repository: UserRepositoryInterface,
    tokenHandler: TokenHandlerAdapterInterface,
    generateUserImageLinkUsecase: GenerateUserImageLinkUsecaseInterface,
  ) {
    this.repository = repository;
    this.tokenHandler = tokenHandler;
    this.generateUserImageLinkUsecase = generateUserImageLinkUsecase;
  }

  public async execute(selfieLoginDto: SelfieLoginDto): Promise<LoggedUserDto> {
    const foundUser = await this.repository.getOneByCpf(selfieLoginDto.cpf);
    const secret = process.env.SECRET;

    if (foundUser) {
      const tempImageLink = await this.generateUserImageLinkUsecase.execute(
        foundUser.id,
        selfieLoginDto.selfie,
      );

      const comparison = await this.faceAuthentication.authenticate({
        peopleId: selfieLoginDto.cpf,
        imageUrl: tempImageLink,
      });

      if (comparison && comparison.isMatch) {
        const token = this.tokenHandler.generateToken(
          { id: foundUser.id },
          secret,
        );

        return {
          token,
          user: foundUser,
        };
      } else {
        throw new InvalidParamError('password');
      }
    } else {
      throw new InvalidParamError('email');
    }
  }
}
