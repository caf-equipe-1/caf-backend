import { UpdateAppUsecaseInterface } from 'src/data/abstract/usecases/app/updateApp-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { UpdateAppControllerInterface } from 'src/presentation/abstract/controllers/app/updateApp-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class UpdateAppController implements UpdateAppControllerInterface {
  private readonly updateAppUsecase: UpdateAppUsecaseInterface;

  public constructor(updateAppUsecase: UpdateAppUsecaseInterface) {
    this.updateAppUsecase = updateAppUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateAppType>,
  ): Promise<HttpResponse<App>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.id:
          throw new MissingParamError('Id');

        default:
          break;
      }

      const updatedApp = await this.updateAppUsecase.execute(
        request.id,
        request.body,
      );

      return Response.ok(updatedApp);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
