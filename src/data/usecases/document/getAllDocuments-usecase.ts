import { GetAllDocumentsUsecaseInterface } from 'src/data/abstract/usecases/document/getAllDocuments-usecase-interface';
import { Document } from 'src/domain/entities/document/document-entity';
import { DocumentRepositoryInterface } from 'src/infra/abstract/repositories/document/document-repository-interface';

export class GetAllDocumentsUsecase implements GetAllDocumentsUsecaseInterface {
  private readonly documentRepository: DocumentRepositoryInterface;

  public constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  public async execute(userId: string): Promise<Document[]> {
    const found = await this.documentRepository.getAll(userId);

    return found;
  }
}
