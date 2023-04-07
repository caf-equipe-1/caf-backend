import { Card } from 'src/domain/entities/card/card-entity';
import { CardType } from 'src/domain/types/entities/card/card-type';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';

export interface CardEntityInterface {
  setData(passwordDto: CreateOrUpdateCardType): void;
  validate(): void;
  getBody(): CardType;
  updateData(mainData: Card): CardType;
}
