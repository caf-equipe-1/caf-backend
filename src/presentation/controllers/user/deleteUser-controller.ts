import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { DeleteUserControllerInterface } from 'src/presentation/abstract/controllers/user/deleteUser-controller-interface';

export class DeleteUserController implements DeleteUserControllerInterface {
  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<User>> {
    throw new Error('Not implemented');
  }
}
