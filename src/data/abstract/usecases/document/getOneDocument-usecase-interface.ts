import { Document } from 'src/domain/entities/document/document-entity';

export interface GetOneDocumentUsecaseInterface {
  execute(documentId: string): Promise<Document>;
}
