import { Card } from 'src/domain/entities/card/card-entity';
import { CardType } from 'src/domain/types/entities/card/card-type';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';
import { SqlQueryHelper } from 'src/infra/helpers/sqlQuery/sqlQuery-helper';

export class CardRepository implements CardRepositoryInterface {
  private readonly database: DatabaseConnectionInterface;

  public constructor(database: DatabaseConnectionInterface) {
    this.database = database;
  }

  public async create(userId: string, cardData: CardType): Promise<Card> {
    this.database.connect();

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
      const createdCard = await this.database.executeSqlQuery(
        cardCreationQuery.getSqlQuery(),
      );

      const userCardRelationQuery = new SqlQueryHelper();
      userCardRelationQuery.setTable('user_card');
      userCardRelationQuery.setAction(sqlAction.INSERT);
      userCardRelationQuery.setValues([
        { field: 'userId', value: userId },
        { field: 'cardId', value: createdCard.id },
      ]);

      await this.database.executeSqlQuery(userCardRelationQuery.getSqlQuery());

      return createdCard;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getOne(cardId: string): Promise<Card> {
    this.database.connect();

    try {
      const cardSearchQuery = new SqlQueryHelper();
      cardSearchQuery.setTable('card');
      cardSearchQuery.setAction(sqlAction.SELECT);
      cardSearchQuery.setWhere([{ field: 'id', operator: '=', value: cardId }]);

      const foundCard = await this.database.executeSqlQuery(
        cardSearchQuery.getSqlQuery(),
      );

      return foundCard;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async getAll(userId: string): Promise<Card[]> {
    this.database.connect();

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

      return foundCards;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async delete(cardId: string): Promise<Card> {
    this.database.connect();

    try {
      const cardDeleteQuery = new SqlQueryHelper();
      cardDeleteQuery.setTable('card');
      cardDeleteQuery.setAction(sqlAction.DELETE);
      cardDeleteQuery.setWhere([{ field: 'id', operator: '=', value: cardId }]);

      const deletedCard = await this.database.executeSqlQuery(
        cardDeleteQuery.getSqlQuery(),
      );

      return deletedCard;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }

  public async update(cardId: string, cardData: CardType): Promise<Card> {
    this.database.connect();

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

      const updatedCard = await this.database.executeSqlQuery(
        cardUpdateQuery.getSqlQuery(),
      );

      return updatedCard;
    } catch (error) {
      console.log(error);
      this.database.disconnect(true);
    }

    this.database.disconnect(false);
  }
}
