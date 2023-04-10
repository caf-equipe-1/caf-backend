import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { App } from 'src/domain/entities/app/app-entity';

export interface DeleteAppControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<App>>;
}
