import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { CreateAppControllerInterface } from 'src/presentation/abstract/controllers/app/createApp-controller-interface';

export class CreateAppController implements CreateAppControllerInterface {
  public async execute(
    request: HttpRequest<CreateOrUpdateAppType>,
  ): Promise<HttpResponse<App>> {
    throw new Error('Not implemented');
  }
}
