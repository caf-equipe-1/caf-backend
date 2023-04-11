import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { UpdatePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/updatePassword-controller-interface';

export class UpdatePasswordController
  implements UpdatePasswordControllerInterface
{
  public async execute(
    request: HttpRequest<CreateOrUpdatePasswordType>,
  ): Promise<HttpResponse<Password>> {
    throw new Error('Not implemented');
  }
}
