import { App } from 'src/domain/entities/app/app-entity';
import { AppType } from 'src/domain/types/entities/app/app-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { Repository } from '../repository/repository';

export class AppRepository
  extends Repository
  implements AppRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(userId: string, appData: AppType): Promise<App> {
    await this.database.begin();

    try {
      const appCreationQuery = new SqlQueryHelper();
      appCreationQuery.setTable('app');
      appCreationQuery.setAction(sqlAction.INSERT);
      appCreationQuery.setValues([
        { field: 'id', value: appData.id },
        { field: 'name', value: appData.name },
        { field: 'createdAt', value: appData.createdAt },
        { field: 'updatedAt', value: appData.updatedAt },
      ]);
      appCreationQuery.setReturn(['id', 'name', 'createdAt', 'updatedAt']);

      const createdApp = await this.database.executeSqlQuery(
        appCreationQuery.getSqlQuery(),
      );

      const userAppRelationQuery = new SqlQueryHelper();
      userAppRelationQuery.setTable('user_app');
      userAppRelationQuery.setAction(sqlAction.INSERT);
      userAppRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'appId', value: createdApp[0].id },
      ]);

      await this.database.executeSqlQuery(userAppRelationQuery.getSqlQuery());

      await this.database.commit();

      return this.adaptProperties(createdApp[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getOne(appId: string): Promise<App> {
    await this.database.begin();

    try {
      const appSearchQuery = new SqlQueryHelper();
      appSearchQuery.setTable('app');
      appSearchQuery.setAction(sqlAction.SELECT);
      appSearchQuery.setWhere([{ field: 'id', operator: '=', value: appId }]);

      const foundApp = await this.database.executeSqlQuery(
        appSearchQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(foundApp[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getAll(userId: string): Promise<App[]> {
    await this.database.begin();

    try {
      const appSearchQuery = new SqlQueryHelper();
      appSearchQuery.setTable('app');
      appSearchQuery.setAction(sqlAction.SELECT);
      appSearchQuery.setInnerJoin([
        { table: 'user_app', field1: 'appId', operator: '=', field2: 'id' },
      ]);
      appSearchQuery.setWhere([
        { field: 'userId', operator: '=', value: userId },
      ]);

      const foundApps = await this.database.executeSqlQuery(
        appSearchQuery.getSqlQuery(),
      );

      await this.database.commit();

      return foundApps.map((item: any) =>
        this.adaptProperties({ ...item, id: item.appid }),
      );
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async delete(appId: string): Promise<App> {
    await this.database.begin();

    try {
      const appDeleteQuery = new SqlQueryHelper();
      appDeleteQuery.setTable('app');
      appDeleteQuery.setAction(sqlAction.DELETE);
      appDeleteQuery.setWhere([{ field: 'id', operator: '=', value: appId }]);
      appDeleteQuery.setReturn(['id', 'name', 'createdAt', 'updatedAt']);

      const deletedApp = await this.database.executeSqlQuery(
        appDeleteQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(deletedApp[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async update(appId: string, appData: AppType): Promise<App> {
    await this.database.begin();

    try {
      const appUpdateQuery = new SqlQueryHelper();
      appUpdateQuery.setTable('app');
      appUpdateQuery.setAction(sqlAction.UPDATE);
      appUpdateQuery.setWhere([{ field: 'id', operator: '=', value: appId }]);
      appUpdateQuery.setValues([
        { field: 'id', value: appData.id },
        { field: 'name', value: appData.name },
        { field: 'createdAt', value: appData.createdAt },
        { field: 'updatedAt', value: appData.updatedAt },
      ]);
      appUpdateQuery.setReturn(['id', 'name', 'createdAt', 'updatedAt']);

      const updatedApp = await this.database.executeSqlQuery(
        appUpdateQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(updatedApp[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }
}
