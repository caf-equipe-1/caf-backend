import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { DeleteCardControllerInterface } from 'src/presentation/abstract/controllers/card/deleteCard-controller-interface';

export class DeleteCardController implements DeleteCardControllerInterface {
  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<Card>> {
    throw new Error('Not implemented');
  }
}
