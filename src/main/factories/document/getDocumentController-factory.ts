import { GetDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/getDocument-controller-interface';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';

export function makeGetDocumentFactory(): GetDocumentControllerInterface {
  return new GetDocumentController();
}
