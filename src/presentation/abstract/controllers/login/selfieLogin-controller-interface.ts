import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';

export interface SelfieLoginControllerInterface {
  execute(
    request: HttpRequest<SelfieLoginDto>,
  ): Promise<HttpResponse<LoggedUserDto>>;
}
