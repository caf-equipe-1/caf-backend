import { GetAllAppsUsecaseInterface } from 'src/data/abstract/usecases/app/getAllApps-usecase-interface';
import { GetOneAppUsecaseInterface } from 'src/data/abstract/usecases/app/getOneApp-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { GetAppControllerInterface } from 'src/presentation/abstract/controllers/app/getApp-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class GetAppController implements GetAppControllerInterface {
  private readonly getOneAppUsecase: GetOneAppUsecaseInterface;
  private readonly getAllAppsUseCase: GetAllAppsUsecaseInterface;

  public constructor(
    getOneAppUsecase: GetOneAppUsecaseInterface,
    getAllAppsUseCase: GetAllAppsUsecaseInterface,
  ) {
    this.getOneAppUsecase = getOneAppUsecase;
    this.getAllAppsUseCase = getAllAppsUseCase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<App>> {
    try {
      const getAll = request.userId && !request.id;
      const getOne = request.id && !request.userId;

      switch (true) {
        case getAll:
          const foundApps = await this.getAllAppsUseCase.execute(
            request.userId,
          );
          return Response.ok(foundApps);

        case getOne:
          const foundApp = await this.getOneAppUsecase.execute(request.id);
          return Response.ok(foundApp);

        default:
          throw new MissingParamError('Id');
      }
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
