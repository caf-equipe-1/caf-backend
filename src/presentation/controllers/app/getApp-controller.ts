import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { GetAppControllerInterface } from 'src/presentation/abstract/controllers/app/getApp-controller-interface';

export class GetAppController implements GetAppControllerInterface {
  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<App>> {
    throw new Error('Not implemented');
  }
}
