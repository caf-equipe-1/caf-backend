import { DeleteAppUsecaseInterface } from 'src/data/abstract/usecases/app/deleteApp-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { DeleteAppControllerInterface } from 'src/presentation/abstract/controllers/app/deleteApp-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class DeleteAppController implements DeleteAppControllerInterface {
  private readonly deleteAppUsecase: DeleteAppUsecaseInterface;

  public constructor(deleteAppUsecase: DeleteAppUsecaseInterface) {
    this.deleteAppUsecase = deleteAppUsecase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<App>> {
    try {
      if (!request.id) {
        throw new MissingParamError('Id');
      }

      const deletedApp = await this.deleteAppUsecase.execute(request.id);

      return Response.ok(deletedApp);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
