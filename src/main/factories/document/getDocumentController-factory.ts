import { GetAllDocumentsUsecase } from 'src/data/usecases/document/getAllDocuments-usecase';
import { GetOneDocumentUsecase } from 'src/data/usecases/document/getOneDocument-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { DocumentRepository } from 'src/infra/repositories/document/document-repository';
import { GetDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/getDocument-controller-interface';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';

export function makeGetDocumentFactory(): GetDocumentControllerInterface {
  const database = new DatabaseConnection();
  const documentRepository = new DocumentRepository(database);
  const getOneDocumentUsecase = new GetOneDocumentUsecase(documentRepository);
  const getAllDocumentsUseCase = new GetAllDocumentsUsecase(documentRepository);

  return new GetDocumentController(
    getOneDocumentUsecase,
    getAllDocumentsUseCase,
  );
}
