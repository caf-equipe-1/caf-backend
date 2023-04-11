import { DeleteDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/deleteDocument-controller-interface';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';

export function makeDeleteDocumentFactory(): DeleteDocumentControllerInterface {
  return new DeleteDocumentController();
}
