import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';

export interface UpdateCardUsecaseInterface {
  execute(cardId: string, cardDto: CreateOrUpdateCardType): Promise<Card>;
}
