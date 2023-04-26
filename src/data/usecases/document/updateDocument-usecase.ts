import { DocumentEntityInterface } from 'src/data/abstract/entities/document/document-entity-interface';
import { UpdateDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/updateDocument-usecase-interface';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { DocumentRepositoryInterface } from 'src/infra/abstract/repositories/document/document-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdateDocumentUsecase implements UpdateDocumentUsecaseInterface {
  private readonly documentRepository: DocumentRepositoryInterface;
  private readonly documentEntity: DocumentEntityInterface;

  public constructor(
    documentRepository: DocumentRepositoryInterface,
    documentEntity: DocumentEntityInterface,
  ) {
    this.documentRepository = documentRepository;
    this.documentEntity = documentEntity;
  }

  public async execute(
    documentId: string,
    documentDto: CreateOrUpdateDocumentType,
  ): Promise<Document> {
    const found = await this.documentRepository.getOne(documentId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const entity = this.documentEntity;
    entity.setData(documentDto);
    entity.validateUpdate();

    const updated = await this.documentRepository.update(
      documentId,
      entity.updateData(found),
    );

    return updated;
  }
}
