import { CreateAppUsecaseInterface } from 'src/data/abstract/usecases/app/createApp-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { CreateAppControllerInterface } from 'src/presentation/abstract/controllers/app/createApp-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class CreateAppController implements CreateAppControllerInterface {
  private readonly createAppUsecase: CreateAppUsecaseInterface;

  public constructor(createAppUsecase: CreateAppUsecaseInterface) {
    this.createAppUsecase = createAppUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateAppType>,
  ): Promise<HttpResponse<App>> {
    try {
      if (!request.body) {
        throw new MissingParamError('Request body');
      }

      const createdApp = await this.createAppUsecase.execute(
        request.userId,
        request.body,
      );

      return Response.created(createdApp);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
