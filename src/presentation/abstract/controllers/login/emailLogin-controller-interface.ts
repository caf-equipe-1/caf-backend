import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';

export interface EmailLoginControllerInterface {
  execute(
    request: HttpRequest<EmailLoginDto>,
  ): Promise<HttpResponse<LoggedUserDto>>;
}
