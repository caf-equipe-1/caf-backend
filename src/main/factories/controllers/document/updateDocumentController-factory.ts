import { DocumentEntity } from 'src/data/entities/document/document-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { UpdateDocumentUsecase } from 'src/data/usecases/document/updateDocument-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { DocumentRepository } from 'src/infra/repositories/document/document-repository';
import { UpdateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/updateDocument-controller-interface';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';

export function makeUpdateDocumentControllerFactory(): UpdateDocumentControllerInterface {
  const database = new DatabaseConnection();
  const documentRepository = new DocumentRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const documentEntity = new DocumentEntity(idGenerator);
  const updateDocumentUsecase = new UpdateDocumentUsecase(
    documentRepository,
    documentEntity,
  );

  return new UpdateDocumentController(updateDocumentUsecase);
}
