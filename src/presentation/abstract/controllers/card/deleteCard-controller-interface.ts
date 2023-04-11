import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';

export interface DeleteCardControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<Card>>;
}
