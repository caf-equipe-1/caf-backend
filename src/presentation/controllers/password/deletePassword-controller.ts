import { DeletePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/deletePassword-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { DeletePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/deletePassword-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class DeletePasswordController
  implements DeletePasswordControllerInterface
{
  private readonly deletePasswordUsecase: DeletePasswordUsecaseInterface;

  public constructor(deletePasswordUsecase: DeletePasswordUsecaseInterface) {
    this.deletePasswordUsecase = deletePasswordUsecase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Password>> {
    try {
      if (!request.id) {
        throw new MissingParamError('Id');
      }

      const deletedPassword = await this.deletePasswordUsecase.execute(
        request.id,
      );

      return Response.ok(deletedPassword);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
