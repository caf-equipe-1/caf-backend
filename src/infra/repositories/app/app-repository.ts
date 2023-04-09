import { App } from 'src/domain/entities/app/app-entity';
import { AppType } from 'src/domain/types/entities/app/app-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';

export class AppRepository implements AppRepositoryInterface {
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    this.database = database;
  }

  public async create(userId: string, appData: AppType): Promise<App> {
    this.database.connect();

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
      const createdApp = await this.database.executeSqlQuery(
        appCreationQuery.getSqlQuery(),
      );

      const userAppRelationQuery = new SqlQueryHelper();
      userAppRelationQuery.setTable('user_app');
      userAppRelationQuery.setAction(sqlAction.INSERT);
      userAppRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'appId', value: createdApp.id },
      ]);

      await this.database.executeSqlQuery(userAppRelationQuery.getSqlQuery());

      return createdApp;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOne(appId: string): Promise<App> {
    this.database.connect();

    try {
      const appSearchQuery = new SqlQueryHelper();
      appSearchQuery.setTable('app');
      appSearchQuery.setAction(sqlAction.SELECT);
      appSearchQuery.setWhere([{ field: 'id', operator: '=', value: appId }]);

      const foundApp = await this.database.executeSqlQuery(
        appSearchQuery.getSqlQuery(),
      );

      return foundApp;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getAll(userId: string): Promise<App[]> {
    this.database.connect();

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

      return foundApps;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async delete(appId: string): Promise<App> {
    this.database.connect();

    try {
      const appDeleteQuery = new SqlQueryHelper();
      appDeleteQuery.setTable('app');
      appDeleteQuery.setAction(sqlAction.DELETE);
      appDeleteQuery.setWhere([{ field: 'id', operator: '=', value: appId }]);

      const deletedApp = await this.database.executeSqlQuery(
        appDeleteQuery.getSqlQuery(),
      );

      return deletedApp;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async update(appId: string, appData: AppType): Promise<App> {
    this.database.connect();

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

      const updatedApp = await this.database.executeSqlQuery(
        appUpdateQuery.getSqlQuery(),
      );

      return updatedApp;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }
}
