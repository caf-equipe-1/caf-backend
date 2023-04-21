import { User } from 'src/domain/entities/user/user-entity';
import { UserType } from 'src/domain/types/entities/user/user-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { UserRepositoryInterface } from 'src/infra/abstract/repositories/user/user-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { Repository } from '../repository/repository';
import { App } from 'src/domain/entities/app/app-entity';
import { Card } from 'src/domain/entities/card/card-entity';
import { Password } from 'src/domain/entities/password/password-entity';

type RelationsType = {
  passwords: Password[];
  documents: {
    id: string;
    name: string;
  }[];
  cards: Card[];
  apps: App[];
};

export class UserRepository
  extends Repository
  implements UserRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(userData: UserType): Promise<User> {
    await this.database.begin();

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

      const userRelations = this.getRelations(createdUser[0].id);
      const user = {
        ...this.adaptProperties(createdUser[0]),
        ...userRelations,
      };

      await this.database.commit();

      return user;
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getOneById(userId: string): Promise<User> {
    await this.database.begin();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);
      userSearchQuery.setWhere([{ field: 'id', operator: '=', value: userId }]);

      const foundUser = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      if (foundUser.length > 0) {
        const userRelations = await this.getRelations(foundUser[0].id);
        const user = {
          ...this.adaptProperties(foundUser[0]),
          ...userRelations,
        };

        await this.database.commit();

        return user;
      }
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getOneByCpf(userCnpj: string): Promise<User> {
    await this.database.begin();

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

      await this.database.commit();

      return this.adaptProperties(foundUser[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getOneByEmail(userEmail: string): Promise<User> {
    await this.database.begin();

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

      await this.database.commit();

      return this.adaptProperties(foundUser[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getAll(): Promise<User[]> {
    await this.database.begin();

    try {
      const userSearchQuery = new SqlQueryHelper();
      userSearchQuery.setTable('user');
      userSearchQuery.setAction(sqlAction.SELECT);

      const foundUsers = await this.database.executeSqlQuery(
        userSearchQuery.getSqlQuery(),
      );

      await this.database.commit();

      return foundUsers.map((item: any) => this.adaptProperties(item));
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async delete(userId: string): Promise<User> {
    await this.database.begin();

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

      await this.database.commit();

      return this.adaptProperties(deletedUser[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async update(userId: string, userData: UserType): Promise<User> {
    await this.database.begin();

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

      await this.database.commit();

      return this.adaptProperties(updatedUser[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  private async getRelations(userId: string): Promise<RelationsType> {
    const relations = {
      apps: [],
      cards: [],
      documents: [],
      passwords: [],
    };

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
    relations.apps = foundApps.map((item: any) =>
      this.adaptProperties({ ...item, id: item.appid }),
    );

    const cardSearchQuery = new SqlQueryHelper();
    cardSearchQuery.setTable('card');
    cardSearchQuery.setAction(sqlAction.SELECT);
    cardSearchQuery.setInnerJoin([
      { table: 'user_card', field1: 'cardId', operator: '=', field2: 'id' },
    ]);
    cardSearchQuery.setWhere([
      { field: 'userId', operator: '=', value: userId },
    ]);
    const foundCards = await this.database.executeSqlQuery(
      cardSearchQuery.getSqlQuery(),
    );
    relations.cards = foundCards.map((item: any) =>
      this.adaptProperties({ ...item, id: item.cardid }),
    );

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
    relations.documents = foundDocuments.map((item: any) =>
      this.adaptProperties({ ...item, id: item.documentid }),
    );

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

    relations.passwords = foundPasswords.map((item: any) =>
      this.adaptProperties({ ...item, id: item.passwordid }),
    );

    return relations;
  }
}
