import { FaceAuthenticationAdapterInterface } from 'src/data/abstract/helpers/adapters/auth/faceAuthentication-adapter-interface';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/adapters/tokenHandler/tokenHandler-adapter-interface';
import { FileHelperInterface } from 'src/data/abstract/helpers/file/file-helper-interface';
import { MakeSelfieLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeSelfieLogin-usecase-interface';
import { GenerateTempImageLinkUsecaseInterface } from 'src/data/abstract/usecases/tempImage/generateTempImageLink-usecase-interface';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidCredentialsError } from 'src/utils/errors/invalidCredentials-error';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class MakeSelfieLoginUseCase implements MakeSelfieLoginUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly tokenHandler: TokenHandlerAdapterInterface;
  private readonly faceAuthentication: FaceAuthenticationAdapterInterface;
  private readonly generateTempImageLinkUsecase: GenerateTempImageLinkUsecaseInterface;
  private readonly fileHelper: FileHelperInterface;

  public constructor(
    repository: UserRepositoryInterface,
    tokenHandler: TokenHandlerAdapterInterface,
    faceAuthentication: FaceAuthenticationAdapterInterface,
    generateTempImageLinkUsecase: GenerateTempImageLinkUsecaseInterface,
    fileHelper: FileHelperInterface,
  ) {
    this.repository = repository;
    this.tokenHandler = tokenHandler;
    this.faceAuthentication = faceAuthentication;
    this.generateTempImageLinkUsecase = generateTempImageLinkUsecase;
    this.fileHelper = fileHelper;
  }

  public async execute(selfieLoginDto: SelfieLoginDto): Promise<LoggedUserDto> {
    const fileHelper = this.fileHelper;
    fileHelper.setFile(selfieLoginDto.selfie);
    const { fileType } = fileHelper.getFile();

    if (fileType === null) {
      throw new InvalidParamError('Invalid image type');
    }

    const foundUser = await this.repository.getOneByCpf(selfieLoginDto.cpf);
    const secret = process.env.SECRET;

    if (foundUser) {
      const tempImageLink = await this.generateTempImageLinkUsecase.execute(
        selfieLoginDto.selfie,
      );

      console.log('DEBUG ENVIO PARA API CAF >>>>>>>');
      console.log({
        peopleId: selfieLoginDto.cpf,
        imageUrl: tempImageLink,
      });
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

      const comparison = await this.faceAuthentication.authenticate({
        peopleId: selfieLoginDto.cpf,
        imageUrl: tempImageLink,
      });

      console.log('DEBUG RESPOSTA API CAF >>>>>>>');
      console.log(comparison);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

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
        throw new InvalidCredentialsError();
      }
    } else {
      throw new InvalidCredentialsError();
    }
  }
}
