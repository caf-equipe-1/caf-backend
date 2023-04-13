import { Password } from 'src/domain/entities/password/password-entity';
import { PasswordType } from 'src/domain/types/entities/password/password-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { PasswordRepositoryInterface } from 'src/infra/abstract/repositories/password/password-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { Repository } from '../repository/repository';

export class PasswordRepository
  extends Repository
  implements PasswordRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(
    userId: string,
    passwordData: PasswordType,
  ): Promise<Password> {
    this.database.connect();

    try {
      const passwordCreationQuery = new SqlQueryHelper();
      passwordCreationQuery.setTable('password');
      passwordCreationQuery.setAction(sqlAction.INSERT);
      passwordCreationQuery.setValues([
        { field: 'id', value: passwordData.id },
        { field: 'name', value: passwordData.name },
        { field: 'password', value: passwordData.password },
        { field: 'createdAt', value: passwordData.createdAt },
        { field: 'updatedAt', value: passwordData.updatedAt },
      ]);
      passwordCreationQuery.setReturn([
        'id',
        'name',
        'password',
        'createdAt',
        'updatedAt',
      ]);

      const createdPassword = await this.database.executeSqlQuery(
        passwordCreationQuery.getSqlQuery(),
      );

      const userPasswordRelationQuery = new SqlQueryHelper();
      userPasswordRelationQuery.setTable('user_password');
      userPasswordRelationQuery.setAction(sqlAction.INSERT);
      userPasswordRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'passwordId', value: createdPassword[0].id },
      ]);

      await this.database.executeSqlQuery(
        userPasswordRelationQuery.getSqlQuery(),
      );

      return this.adaptProperties(createdPassword[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOne(passwordId: string): Promise<Password> {
    this.database.connect();

    try {
      const passwordSearchQuery = new SqlQueryHelper();
      passwordSearchQuery.setTable('password');
      passwordSearchQuery.setAction(sqlAction.SELECT);
      passwordSearchQuery.setWhere([
        { field: 'id', operator: '=', value: passwordId },
      ]);

      const foundPassword = await this.database.executeSqlQuery(
        passwordSearchQuery.getSqlQuery(),
      );

      return this.adaptProperties(foundPassword[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getAll(userId: string): Promise<Password[]> {
    this.database.connect();

    try {
      const passwordSearchQuery = new SqlQueryHelper();
      passwordSearchQuery.setTable('password');
      passwordSearchQuery.setAction(sqlAction.SELECT);
      passwordSearchQuery.setInnerJoin([
        {
          table: 'user_password',
          field1: 'passwordId',
          operator: '=',
          field2: 'id',
        },
      ]);
      passwordSearchQuery.setWhere([
        { field: 'userId', operator: '=', value: userId },
      ]);

      const foundPasswords = await this.database.executeSqlQuery(
        passwordSearchQuery.getSqlQuery(),
      );

      return foundPasswords.map((item: any) =>
        this.adaptProperties({ ...item, id: item.passwordid }),
      );
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async delete(passwordId: string): Promise<Password> {
    this.database.connect();

    try {
      const passwordDeleteQuery = new SqlQueryHelper();
      passwordDeleteQuery.setTable('password');
      passwordDeleteQuery.setAction(sqlAction.DELETE);
      passwordDeleteQuery.setWhere([
        { field: 'id', operator: '=', value: passwordId },
      ]);
      passwordDeleteQuery.setReturn([
        'id',
        'name',
        'password',
        'createdAt',
        'updatedAt',
      ]);

      const deletedPassword = await this.database.executeSqlQuery(
        passwordDeleteQuery.getSqlQuery(),
      );

      return this.adaptProperties(deletedPassword[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async update(
    passwordId: string,
    passwordData: PasswordType,
  ): Promise<Password> {
    this.database.connect();

    try {
      const passwordUpdateQuery = new SqlQueryHelper();
      passwordUpdateQuery.setTable('password');
      passwordUpdateQuery.setAction(sqlAction.UPDATE);
      passwordUpdateQuery.setWhere([
        { field: 'id', operator: '=', value: passwordId },
      ]);
      passwordUpdateQuery.setValues([
        { field: 'id', value: passwordData.id },
        { field: 'name', value: passwordData.name },
        { field: 'password', value: passwordData.password },
        { field: 'createdAt', value: passwordData.createdAt },
        { field: 'updatedAt', value: passwordData.updatedAt },
      ]);
      passwordUpdateQuery.setReturn([
        'id',
        'name',
        'password',
        'createdAt',
        'updatedAt',
      ]);

      const updatedPassword = await this.database.executeSqlQuery(
        passwordUpdateQuery.getSqlQuery(),
      );

      return this.adaptProperties(updatedPassword[0]);
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }
}
