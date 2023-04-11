import { UpdateDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/updateDocument-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { UpdateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/updateDocument-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class UpdateDocumentController
  implements UpdateDocumentControllerInterface
{
  private readonly updateDocumentUsecase: UpdateDocumentUsecaseInterface;

  public constructor(updateDocumentUsecase: UpdateDocumentUsecaseInterface) {
    this.updateDocumentUsecase = updateDocumentUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateDocumentType>,
  ): Promise<HttpResponse<Document>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.id:
          throw new MissingParamError('Id');

        default:
          break;
      }

      const updatedDocument = await this.updateDocumentUsecase.execute(
        request.id,
        request.body,
      );

      return Response.ok(updatedDocument);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
