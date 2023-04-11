import { CreateDocumentControllerInterface } from 'src/presentation/abstract/controllers/document/createDocument-controller-interface';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';

export function makeCreateDocumentFactory(): CreateDocumentControllerInterface {
  return new CreateDocumentController();
}
