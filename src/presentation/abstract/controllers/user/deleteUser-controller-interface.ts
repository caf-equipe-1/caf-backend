import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { User } from 'src/domain/entities/user/user-entity';

export interface DeleteUserControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<User>>;
}
