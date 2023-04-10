import { Document } from 'src/domain/entities/document/document-entity';

export interface GetAllDocumentsUsecaseInterface {
  execute(userId: string): Promise<Document[]>;
}
