import { User } from 'src/domain/entities/user/user-entity';
import { UserType } from 'src/domain/types/entities/user/user-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';

export class UserRepository implements UserRepositoryInterface {
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
      userCreationQuery.setReturn([
        'id',
        'name',
        'email',
        'password',
        'photo',
        'cpf',
        'createdAt',
        'updatedAt',
      ]);
      const createdUser = await this.database.executeSqlQuery(
        userCreationQuery.getSqlQuery(),
      );

      return this.adaptProperties(createdUser[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOneById(userId: string): Promise<User> {
    this.database.connect();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);
      userSearchQuery.setWhere([{ field: 'id', operator: '=', value: userId }]);

      const foundUser = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      return this.adaptProperties(foundUser[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOneByCpf(userCnpj: string): Promise<User> {
    this.database.connect();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);
      userSearchQuery.setWhere([
        { field: 'cnpj', operator: '=', value: userCnpj },
      ]);

      const foundUser = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      return this.adaptProperties(foundUser[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOneByEmail(userEmail: string): Promise<User> {
    this.database.connect();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);
      userSearchQuery.setWhere([
        { field: 'email', operator: '=', value: userEmail },
      ]);
      const foundUser = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      return this.adaptProperties(foundUser[0]);
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

      return foundUsers.map((item: any) => this.adaptProperties(item));
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
      userDeleteQuery.setReturn([
        'id',
        'name',
        'email',
        'password',
        'photo',
        'cpf',
        'createdAt',
        'updatedAt',
      ]);

      const deletedUser = await this.database.executeSqlQuery(
        userDeleteQuery.getSqlQuery(),
      );

      return this.adaptProperties(deletedUser[0]);
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
      userUpdateQuery.setReturn([
        'id',
        'name',
        'email',
        'password',
        'photo',
        'cpf',
        'createdAt',
        'updatedAt',
      ]);

      const updatedUser = await this.database.executeSqlQuery(
        userUpdateQuery.getSqlQuery(),
      );

      return this.adaptProperties(updatedUser[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  private adaptProperties(item: any): any {
    if (item) {
      const adaptedItem = item;

      adaptedItem.createdAt = item.createdat;
      adaptedItem.updatedAt = item.updatedat;

      delete adaptedItem.createdat;
      delete adaptedItem.updatedat;

      return adaptedItem;
    }
  }
}
