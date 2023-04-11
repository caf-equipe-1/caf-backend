import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { UpdateCardControllerInterface } from 'src/presentation/abstract/controllers/card/updateCard-controller-interface';

export class UpdateCardController implements UpdateCardControllerInterface {
  public async execute(
    request: HttpRequest<CreateOrUpdateCardType>,
  ): Promise<HttpResponse<Card>> {
    throw new Error('Not implemented');
  }
}
