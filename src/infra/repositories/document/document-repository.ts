import { Document } from 'src/domain/entities/document/document-entity';
import { DocumentType } from 'src/domain/types/entities/document/document-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { DocumentRepositoryInterface } from 'src/infra/abstract/repositories/document/document-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { Repository } from '../repository/repository';

export class DocumentRepository
  extends Repository
  implements DocumentRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(
    userId: string,
    documentData: DocumentType,
  ): Promise<Document> {
    try {
      const documentCreationQuery = new SqlQueryHelper();
      documentCreationQuery.setTable('document');
      documentCreationQuery.setAction(sqlAction.INSERT);
      documentCreationQuery.setValues([
        { field: 'id', value: documentData.id },
        { field: 'name', value: documentData.name },
        { field: 'document', value: documentData.document },
        { field: 'createdAt', value: documentData.createdAt },
        { field: 'updatedAt', value: documentData.updatedAt },
      ]);
      documentCreationQuery.setReturn([
        'id',
        'name',
        'document',
        'createdAt',
        'updatedAt',
      ]);

      const createdDocument = await this.database.executeSqlQuery(
        documentCreationQuery.getSqlQuery(),
      );

      const userDocumentRelationQuery = new SqlQueryHelper();
      userDocumentRelationQuery.setTable('user_document');
      userDocumentRelationQuery.setAction(sqlAction.INSERT);
      userDocumentRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'documentId', value: createdDocument[0].id },
      ]);

      await this.database.executeSqlQuery(
        userDocumentRelationQuery.getSqlQuery(),
      );

      return this.adaptProperties(createdDocument[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  public async getOne(documentId: string): Promise<Document> {
    try {
      const documentSearchQuery = new SqlQueryHelper();
      documentSearchQuery.setTable('document');
      documentSearchQuery.setAction(sqlAction.SELECT);
      documentSearchQuery.setWhere([
        { field: 'id', operator: '=', value: documentId },
      ]);

      const foundDocument = await this.database.executeSqlQuery(
        documentSearchQuery.getSqlQuery(),
      );

      return this.adaptProperties(foundDocument[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  public async getAll(userId: string): Promise<Document[]> {
    try {
      const documentSearchQuery = new SqlQueryHelper();
      documentSearchQuery.setTable('document');
      documentSearchQuery.setAction(sqlAction.SELECT);
      documentSearchQuery.setInnerJoin([
        {
          table: 'user_document',
          field1: 'documentId',
          operator: '=',
          field2: 'id',
        },
      ]);
      documentSearchQuery.setWhere([
        { field: 'userId', operator: '=', value: userId },
      ]);

      const foundDocuments = await this.database.executeSqlQuery(
        documentSearchQuery.getSqlQuery(),
      );

      return foundDocuments.map((item: any) =>
        this.adaptProperties({ ...item, id: item.documentid }),
      );
    } catch (error) {
      console.log(error);

      return;
    }
  }

  public async delete(documentId: string): Promise<Document> {
    try {
      const documentDeleteQuery = new SqlQueryHelper();
      documentDeleteQuery.setTable('document');
      documentDeleteQuery.setAction(sqlAction.DELETE);
      documentDeleteQuery.setWhere([
        { field: 'id', operator: '=', value: documentId },
      ]);
      documentDeleteQuery.setReturn([
        'id',
        'name',
        'document',
        'createdAt',
        'updatedAt',
      ]);

      const deletedDocument = await this.database.executeSqlQuery(
        documentDeleteQuery.getSqlQuery(),
      );

      return this.adaptProperties(deletedDocument[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  public async update(
    documentId: string,
    documentData: DocumentType,
  ): Promise<Document> {
    try {
      const documentUpdateQuery = new SqlQueryHelper();
      documentUpdateQuery.setTable('document');
      documentUpdateQuery.setAction(sqlAction.UPDATE);
      documentUpdateQuery.setWhere([
        { field: 'id', operator: '=', value: documentId },
      ]);
      documentUpdateQuery.setValues([
        { field: 'id', value: documentData.id },
        { field: 'name', value: documentData.name },
        { field: 'document', value: documentData.document },
        { field: 'createdAt', value: documentData.createdAt },
        { field: 'updatedAt', value: documentData.updatedAt },
      ]);
      documentUpdateQuery.setReturn([
        'id',
        'name',
        'document',
        'createdAt',
        'updatedAt',
      ]);

      const updatedDocument = await this.database.executeSqlQuery(
        documentUpdateQuery.getSqlQuery(),
      );

      return this.adaptProperties(updatedDocument[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }
}
