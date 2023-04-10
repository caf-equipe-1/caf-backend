import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';

export interface UpdateDocumentUsecaseInterface {
  execute(
    documentId: string,
    documentDto: CreateOrUpdateDocumentType,
  ): Promise<Document>;
}
