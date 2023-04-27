import { HashAdapterInterface } from 'src/data/abstract/helpers/adapters/hash/hash-adapter-interface';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/tokenHandler/tokenHandler-adapter-interface';
import { MakeEmailLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeEmailLogin-usecase-interface';
import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class MakeEmailLoginUseCase implements MakeEmailLoginUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly hasher: HashAdapterInterface;
  private readonly tokenHandler: TokenHandlerAdapterInterface;

  public constructor(
    repository: UserRepositoryInterface,
    hasher: HashAdapterInterface,
    tokenHandler: TokenHandlerAdapterInterface,
  ) {
    this.repository = repository;
    this.hasher = hasher;
    this.tokenHandler = tokenHandler;
  }

  public async execute(emailLoginDto: EmailLoginDto): Promise<LoggedUserDto> {
    const foundUser = await this.repository.getOneByEmail(emailLoginDto.email);
    const secret = process.env.SECRET;

    if (foundUser) {
      const comparison = this.hasher.compare(
        emailLoginDto.password,
        foundUser.password,
      );

      if (comparison) {
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
