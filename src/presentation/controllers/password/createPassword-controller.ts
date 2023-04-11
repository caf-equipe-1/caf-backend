import { CreatePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/createPassword-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { CreatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/createPassword-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class CreatePasswordController
  implements CreatePasswordControllerInterface
{
  private readonly createPasswordUsecase: CreatePasswordUsecaseInterface;

  public constructor(createPasswordUsecase: CreatePasswordUsecaseInterface) {
    this.createPasswordUsecase = createPasswordUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdatePasswordType>,
  ): Promise<HttpResponse<Password>> {
    try {
      if (!request.body) {
        throw new MissingParamError('Request body');
      }

      const createdPassword = await this.createPasswordUsecase.execute(
        request.userId,
        request.body,
      );

      return Response.created(createdPassword);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
