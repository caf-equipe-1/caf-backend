import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';

export type RegisterCardsDto = {
  creditCardInfo: CreateOrUpdateCardType[];
};
