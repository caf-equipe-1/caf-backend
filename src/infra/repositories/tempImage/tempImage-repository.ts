import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { Repository } from '../repository/repository';
import { TempImageType } from 'src/domain/types/entities/tempImage/tempImage-type';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { TempImageRepositoryInterface } from 'src/infra/abstract/repositories/tempImage/tempImage-repository-interface';

export class TempImageRepository
  extends Repository
  implements TempImageRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(id: string, selfie: string): Promise<TempImageType> {
    try {
      await this.delete(id);

      const tempImageCreationQuery = new SqlQueryHelper();
      tempImageCreationQuery.setTable('tempimage');
      tempImageCreationQuery.setAction(sqlAction.INSERT);
      tempImageCreationQuery.setValues([
        { field: 'id', value: id },
        { field: 'photo', value: selfie },
      ]);
      tempImageCreationQuery.setReturn(['id', 'photo']);

      const createdTempImage = await this.database.executeSqlQuery(
        tempImageCreationQuery.getSqlQuery(),
      );

      return this.adaptProperties(createdTempImage[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  public async getOne(id: string): Promise<TempImageType> {
    try {
      const tempImageSearchQuery = new SqlQueryHelper();
      tempImageSearchQuery.setTable('tempimage');
      tempImageSearchQuery.setAction(sqlAction.SELECT);
      tempImageSearchQuery.setWhere([
        { field: 'id', operator: '=', value: id },
      ]);

      const foundTempImage = await this.database.executeSqlQuery(
        tempImageSearchQuery.getSqlQuery(),
      );

      // await this.delete(id);

      return this.adaptProperties(foundTempImage[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  private async delete(id: string): Promise<TempImageType> {
    try {
      const tempImageDeleteQuery = new SqlQueryHelper();
      tempImageDeleteQuery.setTable('tempimage');
      tempImageDeleteQuery.setAction(sqlAction.DELETE);
      tempImageDeleteQuery.setWhere([
        { field: 'id', operator: '=', value: id },
      ]);
      tempImageDeleteQuery.setReturn(['id', 'photo']);

      const deletedTempImage = await this.database.executeSqlQuery(
        tempImageDeleteQuery.getSqlQuery(),
      );

      return this.adaptProperties(deletedTempImage[0]);
    } catch (error) {
      console.log(error);

      return;
    }
  }
}
