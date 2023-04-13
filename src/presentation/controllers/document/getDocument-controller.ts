import { GetAllDocumentsUsecaseInterface } from 'src/data/abstract/usecases/document/getAllDocuments-usecase-interface';
import { GetOneDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/getOneDocument-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Document } from 'src/domain/entities/document/document-entity';
import { GetDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/getDocument-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class GetDocumentController implements GetDocumentControllerInterface {
  private readonly getOneDocumentUsecase: GetOneDocumentUsecaseInterface;
  private readonly getAllDocumentsUseCase: GetAllDocumentsUsecaseInterface;

  public constructor(
    getOneDocumentUsecase: GetOneDocumentUsecaseInterface,
    getAllDocumentsUseCase: GetAllDocumentsUsecaseInterface,
  ) {
    this.getOneDocumentUsecase = getOneDocumentUsecase;
    this.getAllDocumentsUseCase = getAllDocumentsUseCase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Document>> {
    try {
      const getAll = request.userId && !request.id;
      const getOne = request.id && !request.userId;

      switch (true) {
        case getAll:
          const foundDocuments = await this.getAllDocumentsUseCase.execute(
            request.userId,
          );
          return Response.ok(foundDocuments);

        case getOne:
          const foundDocument = await this.getOneDocumentUsecase.execute(
            request.id,
          );
          return Response.ok(foundDocument);

        default:
          throw new MissingParamError('Id');
      }
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
