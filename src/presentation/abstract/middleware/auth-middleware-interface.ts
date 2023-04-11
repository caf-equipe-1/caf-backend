import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';

export interface AuthMiddlewareInterface {
  auth(httpRequest: HttpRequest<any>): Promise<string>;
}
