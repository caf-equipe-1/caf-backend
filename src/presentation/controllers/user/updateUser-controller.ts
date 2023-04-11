import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UpdateUserControllerInterface } from 'src/presentation/abstract/controllers/user/updateUser-controller-interface';

export class UpdateUserController implements UpdateUserControllerInterface {
  public async execute(
    request: HttpRequest<UpdateProfileDto>,
  ): Promise<HttpResponse<User>> {
    throw new Error('Not implemented');
  }
}
