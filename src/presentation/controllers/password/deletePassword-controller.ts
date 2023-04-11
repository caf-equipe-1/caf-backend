import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { DeletePasswordControllerInterface } from 'src/presentation/abstract/controllers/password/deletePassword-controller-interface';

export class DeletePasswordController
  implements DeletePasswordControllerInterface
{
  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Password>> {
    throw new Error('Not implemented');
  }
}
