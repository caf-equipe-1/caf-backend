import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';

export interface CreateDocumentControllerInterface {
  execute(
    request: HttpRequest<CreateOrUpdateDocumentType>,
  ): Promise<HttpResponse<Document>>;
}
