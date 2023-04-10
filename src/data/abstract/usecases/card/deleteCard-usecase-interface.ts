import { Card } from 'src/domain/entities/card/card-entity';

export interface DeleteCardUsecaseInterface {
  execute(cardId: string): Promise<Card>;
}
