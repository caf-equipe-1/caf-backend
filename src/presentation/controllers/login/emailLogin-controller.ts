import { MakeEmailLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeEmailLogin-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { EmailLoginControllerInterface } from 'src/presentation/abstract/controllers/login/emailLogin-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class EmailLoginController implements EmailLoginControllerInterface {
  private readonly makeEmailLoginUsecase: MakeEmailLoginUseCaseInterface;

  public constructor(makeEmailLoginUsecase: MakeEmailLoginUseCaseInterface) {
    this.makeEmailLoginUsecase = makeEmailLoginUsecase;
  }

  public async execute(
    request: HttpRequest<EmailLoginDto>,
  ): Promise<HttpResponse<LoggedUserDto>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.body.email:
          throw new MissingParamError('Email');

        case !request.body.password:
          throw new MissingParamError('Password');

        default:
          break;
      }

      const logged = await this.makeEmailLoginUsecase.execute(request.body);

      return Response.ok(logged);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
