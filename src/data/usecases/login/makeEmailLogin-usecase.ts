import { HashAdapterInterface } from 'src/data/abstract/helpers/adapters/hash/hash-adapter-interface';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/adapters/tokenHandler/tokenHandler-adapter-interface';
import { MakeEmailLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeEmailLogin-usecase-interface';
import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { InvalidCredentialsError } from 'src/utils/errors/invalidCredentials-error';

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

    if (!foundUser) {
      throw new InvalidCredentialsError();
    }

    const comparison = this.hasher.compare(
      emailLoginDto.password,
      foundUser.password,
    );

    if (!comparison) {
      throw new InvalidCredentialsError();
    }

    const token = this.tokenHandler.generateToken({ id: foundUser.id }, secret);

    return {
      token,
      user: foundUser,
    };
  }
}
