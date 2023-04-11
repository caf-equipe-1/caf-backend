import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';

export interface DeletePasswordControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<Password>>;
}
