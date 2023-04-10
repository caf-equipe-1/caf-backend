import { Card } from 'src/domain/entities/card/card-entity';

export interface GetAllCardsUsecaseInterface {
  execute(userId: string): Promise<Card[]>;
}
