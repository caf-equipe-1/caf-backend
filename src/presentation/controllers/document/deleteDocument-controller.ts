import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { DeleteDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/deleteDocument-controller-interface';

export class DeleteDocumentController
  implements DeleteDocumentControllerInterface
{
  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Document>> {
    throw new Error('Not implemented');
  }
}
