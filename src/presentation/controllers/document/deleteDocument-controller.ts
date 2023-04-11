import { DeleteDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/deleteDocument-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { DeleteDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/deleteDocument-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class DeleteDocumentController
  implements DeleteDocumentControllerInterface
{
  private readonly deleteDocumentUsecase: DeleteDocumentUsecaseInterface;

  public constructor(deleteDocumentUsecase: DeleteDocumentUsecaseInterface) {
    this.deleteDocumentUsecase = deleteDocumentUsecase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Document>> {
    try {
      if (!request.id) {
        throw new MissingParamError('Id');
      }

      const deletedDocument = await this.deleteDocumentUsecase.execute(
        request.id,
      );

      return Response.ok(deletedDocument);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
