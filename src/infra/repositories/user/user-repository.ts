import { User } from 'src/domain/entities/user/user-entity';
import { UserType } from 'src/domain/types/entities/user/user-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';

export class UserRepository {
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    this.database = database;
  }

  public async create(userData: UserType): Promise<User> {
    this.database.connect();

    try {
      const userCreationQuery = new SqlQueryHelper();
      userCreationQuery.setTable('user');
      userCreationQuery.setAction(sqlAction.INSERT);
      userCreationQuery.setValues([
        { field: 'id', value: userData.id },
        { field: 'name', value: userData.name },
        { field: 'email', value: userData.email },
        { field: 'password', value: userData.password },
        { field: 'photo', value: userData.photo },
        { field: 'cpf', value: userData.cpf },
        { field: 'createdAt', value: userData.createdAt },
        { field: 'updatedAt', value: userData.updatedAt },
      ]);
      const createdUser = await this.database.executeSqlQuery(
        userCreationQuery.getSqlQuery(),
      );

      return createdUser;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOne(userId: string): Promise<User> {
    this.database.connect();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);
      userSearchQuery.setWhere([{ field: 'id', operator: '=', value: userId }]);

      const foundUser = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      return foundUser;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getAll(): Promise<User[]> {
    this.database.connect();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);

      const foundUsers = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      return foundUsers;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async delete(userId: string): Promise<User> {
    this.database.connect();

    try {
      const userDeleteQuery = new SqlQueryHelper();
      userDeleteQuery.setTable('user');
      userDeleteQuery.setAction(sqlAction.DELETE);
      userDeleteQuery.setWhere([{ field: 'id', operator: '=', value: userId }]);

      const deletedUser = await this.database.executeSqlQuery(
        userDeleteQuery.getSqlQuery(),
      );

      return deletedUser;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async update(userId: string, userData: UserType): Promise<User> {
    this.database.connect();

    try {
      const userUpdateQuery = new SqlQueryHelper();
      userUpdateQuery.setTable('user');
      userUpdateQuery.setAction(sqlAction.UPDATE);
      userUpdateQuery.setWhere([{ field: 'id', operator: '=', value: userId }]);
      userUpdateQuery.setValues([
        { field: 'id', value: userData.id },
        { field: 'name', value: userData.name },
        { field: 'email', value: userData.email },
        { field: 'password', value: userData.password },
        { field: 'photo', value: userData.photo },
        { field: 'cpf', value: userData.cpf },
        { field: 'createdAt', value: userData.createdAt },
        { field: 'updatedAt', value: userData.updatedAt },
      ]);

      const updatedUser = await this.database.executeSqlQuery(
        userUpdateQuery.getSqlQuery(),
      );

      return updatedUser;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }
}