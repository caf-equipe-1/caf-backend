import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { GetCardControllerInterface } from 'src/presentation/abstract/controllers/card/getCard-controller-interface';

export class GetCardController implements GetCardControllerInterface {
  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<Card>> {
    throw new Error('Not implemented');
  }
}
