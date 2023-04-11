import { UpdateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/updateDocument-controller-interface';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';

export function makeUpdateDocumentFactory(): UpdateDocumentControllerInterface {
  return new UpdateDocumentController();
}
