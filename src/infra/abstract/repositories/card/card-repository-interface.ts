import { Card } from 'src/domain/entities/card/card-entity';
import { CardType } from 'src/domain/types/entities/card/card-type';

export interface CardRepositoryInterface {
  create(userId: string, cardData: CardType): Promise<Card>;
  getOne(cardId: string): Promise<Card>;
  getAll(userId: string): Promise<Card[]>;
  delete(cardId: string): Promise<Card>;
  update(cardId: string, cardData: CardType): Promise<Card>;
}
