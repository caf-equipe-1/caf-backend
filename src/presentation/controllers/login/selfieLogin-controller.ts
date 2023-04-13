import { MakeSelfieLoginUseCaseInterface } from 'src/data/abstract/usecases/login/makeSelfieLogin-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';
import { SelfieLoginControllerInterface } from 'src/presentation/abstract/controllers/login/selfieLogin-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class SelfieLoginController implements SelfieLoginControllerInterface {
  private readonly makeSelfieLoginUsecase: MakeSelfieLoginUseCaseInterface;

  public constructor(makeSelfieLoginUsecase: MakeSelfieLoginUseCaseInterface) {
    this.makeSelfieLoginUsecase = makeSelfieLoginUsecase;
  }

  public async execute(
    request: HttpRequest<SelfieLoginDto>,
  ): Promise<HttpResponse<LoggedUserDto>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.body.cpf:
          throw new MissingParamError('Cpf');

        case !request.body.selfie:
          throw new MissingParamError('Selfie');

        default:
          break;
      }

      const logged = await this.makeSelfieLoginUsecase.execute(request.body);

      return Response.ok(logged);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
