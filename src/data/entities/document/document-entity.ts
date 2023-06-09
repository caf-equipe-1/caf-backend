import { DocumentEntityInterface } from 'src/data/abstract/entities/document/document-entity-interface';
import { Document } from 'src/domain/entities/document/document-entity';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { DocumentType } from 'src/domain/types/entities/document/document-type';
import { Entity } from '../entity/entity';
import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';
import { FileHelperInterface } from 'src/data/abstract/helpers/file/file-helper-interface';

export class DocumentEntity extends Entity implements DocumentEntityInterface {
  private documentDto: CreateOrUpdateDocumentType;
  private readonly idGenerator: IdGeneratorAdapterInterface;

  public constructor(
    idGenerator: IdGeneratorAdapterInterface,
    fileHelper: FileHelperInterface,
  ) {
    super(fileHelper);
    this.idGenerator = idGenerator;
  }

  public setData(documentDto: CreateOrUpdateDocumentType): void {
    this.documentDto = documentDto;
  }

  public validate(): void {
    if (!this.documentDto.name) {
      throw new MissingParamError('Name');
    }

    if (!this.documentDto.document) {
      throw new MissingParamError('Document');
    }

    if (typeof this.documentDto.name !== 'string') {
      throw new InvalidParamError('Name');
    }

    if (typeof this.documentDto.document !== 'string') {
      throw new InvalidParamError('Document');
    }

    if (this.documentDto.name.toString().length > 100) {
      throw new InvalidParamError('Name too long');
    }

    if (!this.validateFileType(this.documentDto.document)) {
      throw new InvalidParamError('Invalid file type');
    }
  }

  public getBody(): DocumentType {
    return {
      id: this.idGenerator.generateId(),
      name: this.documentDto.name ?? '',
      document: this.documentDto.document ?? '',
      createdAt: this.getDate(),
      updatedAt: this.getDate(),
    };
  }

  public updateData(mainData: Document): DocumentType {
    return {
      id: mainData.id,
      name: this.documentDto.name ?? mainData.name,
      document: this.documentDto.document ?? mainData.document,
      createdAt: mainData.createdAt,
      updatedAt: this.getDate(),
    };
  }

  public validateUpdate(): void {
    if (this.documentDto.name) {
      if (typeof this.documentDto.name !== 'string') {
        throw new InvalidParamError('Name');
      }

      if (this.documentDto.name.toString().length > 100) {
        throw new InvalidParamError('Name too long');
      }
    }

    if (this.documentDto.document) {
      if (typeof this.documentDto.document !== 'string') {
        throw new InvalidParamError('Document');
      }
    }
  }
}
