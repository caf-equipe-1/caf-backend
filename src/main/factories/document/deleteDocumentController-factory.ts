import { DeleteDocumentUsecase } from 'src/data/usecases/document/deleteDocument-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { DocumentRepository } from 'src/infra/repositories/document/document-repository';
import { DeleteDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/deleteDocument-controller-interface';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';

export function makeDeleteDocumentFactory(): DeleteDocumentControllerInterface {
  const database = new DatabaseConnection();
  const documentRepository = new DocumentRepository(database);
  const deleteDocumentUsecase = new DeleteDocumentUsecase(documentRepository);

  return new DeleteDocumentController(deleteDocumentUsecase);
}
