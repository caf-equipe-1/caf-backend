import { CreateDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/createDocument-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { CreateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/createDocument-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class CreateDocumentController
  implements CreateDocumentControllerInterface
{
  private readonly createDocumentUsecase: CreateDocumentUsecaseInterface;

  public constructor(createDocumentUsecase: CreateDocumentUsecaseInterface) {
    this.createDocumentUsecase = createDocumentUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateDocumentType>,
  ): Promise<HttpResponse<Document>> {
    try {
      if (!request.body) {
        throw new MissingParamError('Request body');
      }

      const createdDocument = await this.createDocumentUsecase.execute(
        request.userId,
        request.body,
      );

      return Response.created(createdDocument);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
