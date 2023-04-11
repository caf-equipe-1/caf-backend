import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';

export interface CreateUserControllerInterface {
  execute(request: HttpRequest<CreateProfileDto>): Promise<HttpResponse<User>>;
}
