import { Card } from 'src/domain/entities/card/card-entity';
import { CardType } from 'src/domain/types/entities/card/card-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';
import { Repository } from '../repository/repository';

export class CardRepository
  extends Repository
  implements CardRepositoryInterface
{
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    super();
    this.database = database;
  }

  public async create(userId: string, cardData: CardType): Promise<Card> {
    await this.database.begin();

    try {
      const cardCreationQuery = new SqlQueryHelper();
      cardCreationQuery.setTable('card');
      cardCreationQuery.setAction(sqlAction.INSERT);
      cardCreationQuery.setValues([
        { field: 'id', value: cardData.id },
        { field: 'name', value: cardData.name },
        { field: 'nickname', value: cardData.nickname },
        { field: 'number', value: cardData.number },
        { field: 'securityCode', value: cardData.securityCode },
        { field: 'createdAt', value: cardData.createdAt },
        { field: 'updatedAt', value: cardData.updatedAt },
      ]);
      cardCreationQuery.setReturn([
        'id',
        'name',
        'nickname',
        'number',
        'securityCode',
        'createdAt',
        'updatedAt',
      ]);

      const createdCard = await this.database.executeSqlQuery(
        cardCreationQuery.getSqlQuery(),
      );

      const userCardRelationQuery = new SqlQueryHelper();
      userCardRelationQuery.setTable('user_card');
      userCardRelationQuery.setAction(sqlAction.INSERT);
      userCardRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'cardId', value: createdCard[0].id },
      ]);

      await this.database.executeSqlQuery(userCardRelationQuery.getSqlQuery());

      await this.database.commit();

      return this.adaptProperties(createdCard[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getOne(cardId: string): Promise<Card> {
    await this.database.begin();

    try {
      const cardSearchQuery = new SqlQueryHelper();
      cardSearchQuery.setTable('card');
      cardSearchQuery.setAction(sqlAction.SELECT);
      cardSearchQuery.setWhere([{ field: 'id', operator: '=', value: cardId }]);

      const foundCard = await this.database.executeSqlQuery(
        cardSearchQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(foundCard[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async getAll(userId: string): Promise<Card[]> {
    await this.database.begin();

    try {
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

      await this.database.commit();

      return foundCards.map((item: any) =>
        this.adaptProperties({ ...item, id: item.cardid }),
      );
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async delete(cardId: string): Promise<Card> {
    await this.database.begin();

    try {
      const cardDeleteQuery = new SqlQueryHelper();
      cardDeleteQuery.setTable('card');
      cardDeleteQuery.setAction(sqlAction.DELETE);
      cardDeleteQuery.setWhere([{ field: 'id', operator: '=', value: cardId }]);
      cardDeleteQuery.setReturn([
        'id',
        'name',
        'nickname',
        'number',
        'securityCode',
        'createdAt',
        'updatedAt',
      ]);

      const deletedCard = await this.database.executeSqlQuery(
        cardDeleteQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(deletedCard[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }

  public async update(cardId: string, cardData: CardType): Promise<Card> {
    await this.database.begin();

    try {
      const cardUpdateQuery = new SqlQueryHelper();
      cardUpdateQuery.setTable('card');
      cardUpdateQuery.setAction(sqlAction.UPDATE);
      cardUpdateQuery.setWhere([{ field: 'id', operator: '=', value: cardId }]);
      cardUpdateQuery.setValues([
        { field: 'id', value: cardData.id },
        { field: 'name', value: cardData.name },
        { field: 'nickname', value: cardData.nickname },
        { field: 'number', value: cardData.number },
        { field: 'securityCode', value: cardData.securityCode },
        { field: 'createdAt', value: cardData.createdAt },
        { field: 'updatedAt', value: cardData.updatedAt },
      ]);
      cardUpdateQuery.setReturn([
        'id',
        'name',
        'nickname',
        'number',
        'securityCode',
        'createdAt',
        'updatedAt',
      ]);

      const updatedCard = await this.database.executeSqlQuery(
        cardUpdateQuery.getSqlQuery(),
      );

      await this.database.commit();

      return this.adaptProperties(updatedCard[0]);
    } catch (error) {
      console.log(error);
      await this.database.rollback();
    }
  }
}
