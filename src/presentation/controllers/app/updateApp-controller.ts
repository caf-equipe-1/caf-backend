import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { UpdateAppControllerInterface } from 'src/presentation/abstract/controllers/app/updateApp-controller-interface';

export class UpdateAppController implements UpdateAppControllerInterface {
  public async execute(
    request: HttpRequest<CreateOrUpdateAppType>,
  ): Promise<HttpResponse<App>> {
    throw new Error('Not implemented');
  }
}
