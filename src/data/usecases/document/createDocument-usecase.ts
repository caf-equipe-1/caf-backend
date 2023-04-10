import { DocumentEntityInterface } from 'src/data/abstract/entities/document/document-entity-interface';
import { CreateDocumentUsecaseInterface } from 'src/data/abstract/usecases/document/createDocument-usecase-interface';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { DocumentRepositoryInterface } from 'src/infra/abstract/repositories/document/document-repository-interface';

export class CreateDocumentUsecase implements CreateDocumentUsecaseInterface {
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
    userId: string,
    documentDto: CreateOrUpdateDocumentType,
  ): Promise<Document> {
    const enity = this.documentEntity;
    enity.setData(documentDto);
    enity.validate();

    const created = await this.documentRepository.create(
      userId,
      enity.getBody(),
    );

    return created;
  }
}
