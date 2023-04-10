import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';

export interface GetDocumentControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<Document>>;
}
