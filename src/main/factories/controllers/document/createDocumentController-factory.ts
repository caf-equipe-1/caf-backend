import { DocumentEntity } from 'src/data/entities/document/document-entity';
import { IdGeneratorAdapter } from 'src/data/helpers/adapters/idGenerator/idGenerator-adapter';
import { CreateDocumentUsecase } from 'src/data/usecases/document/createDocument-usecase';
import { DatabaseConnection } from 'src/infra/database/connection/database-connection';
import { DocumentRepository } from 'src/infra/repositories/document/document-repository';
import { CreateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/createDocument-controller-interface';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';

export function makeCreateDocumentControllerFactory(): CreateDocumentControllerInterface {
  const database = new DatabaseConnection();
  const documentRepository = new DocumentRepository(database);
  const idGenerator = new IdGeneratorAdapter();
  const documentEntity = new DocumentEntity(idGenerator);
  const createDocumentUsecase = new CreateDocumentUsecase(
    documentRepository,
    documentEntity,
  );

  return new CreateDocumentController(createDocumentUsecase);
}
