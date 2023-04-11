import { UpdatePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/updatePassword-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { UpdatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/updatePassword-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class UpdatePasswordController
  implements UpdatePasswordControllerInterface
{
  private readonly updatePasswordUsecase: UpdatePasswordUsecaseInterface;

  public constructor(updatePasswordUsecase: UpdatePasswordUsecaseInterface) {
    this.updatePasswordUsecase = updatePasswordUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdatePasswordType>,
  ): Promise<HttpResponse<Password>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.id:
          throw new MissingParamError('Id');

        default:
          break;
      }

      const updatedPassword = await this.updatePasswordUsecase.execute(
        request.id,
        request.body,
      );

      return Response.ok(updatedPassword);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
