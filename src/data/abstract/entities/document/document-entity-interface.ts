import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { DocumentType } from 'src/domain/types/entities/document/document-type';

export interface DocumentEntityInterface {
  setData(passwordDto: CreateOrUpdateDocumentType): void;
  validate(): void;
  getBody(): DocumentType;
  updateData(mainData: Document): DocumentType;
}
