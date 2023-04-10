import { Document } from 'src/domain/entities/document/document-entity';

export interface DeleteDocumentUsecaseInterface {
  execute(documentId: string): Promise<Document>;
}
