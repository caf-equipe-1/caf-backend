import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';

export interface UpdateUserControllerInterface {
  execute(request: HttpRequest<UpdateProfileDto>): Promise<HttpResponse<User>>;
}
