import { Document } from 'src/domain/entities/document/document-entity';
import { DocumentType } from 'src/domain/types/entities/document/document-type';

export interface DocumentRepositoryInterface {
  create(userId: string, documentData: DocumentType): Promise<Document>;
  getOne(documentId: string): Promise<Document>;
  getAll(userId: string): Promise<Document[]>;
  delete(documentId: string): Promise<Document>;
  update(documentId: string, documentData: DocumentType): Promise<Document>;
}
