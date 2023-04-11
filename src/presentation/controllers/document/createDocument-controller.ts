import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { CreateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/createDocument-controller-interface';

export class CreateDocumentController
  implements CreateDocumentControllerInterface
{
  public async execute(
    request: HttpRequest<CreateOrUpdateDocumentType>,
  ): Promise<HttpResponse<Document>> {
    throw new Error('Not implemented');
  }
}
