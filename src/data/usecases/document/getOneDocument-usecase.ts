import { GetOneDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/getOneDocument-usecase-interface';
import { Document } from 'src/domain/entities/document/document-entity';
import { DocumentRepositoryInterface } from 'src/infra/abstract/repositories/document/document-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetOneDocumentUsecase implements GetOneDocumentUsecaseInterface {
  private readonly documentRepository: DocumentRepositoryInterface;

  public constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  public async execute(documentId: string): Promise<Document> {
    const found = await this.documentRepository.getOne(documentId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    return found;
  }
}
