import { Card } from 'src/domain/entities/card/card-entity';

export interface GetOneCardUsecaseInterface {
  execute(cardId: string): Promise<Card>;
}
