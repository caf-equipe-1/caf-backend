import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';

export interface GetUserImageControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<string>>;
}
