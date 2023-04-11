import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';
import { DeleteAppControllerInterface } from 'src/presentation/abstract/controllers/app/deleteApp-controller-interface';

export class DeleteAppController implements DeleteAppControllerInterface {
  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<App>> {
    throw new Error('Not implemented');
  }
}
