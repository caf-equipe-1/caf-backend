import { CardEntityInterface } from 'src/data/abstract/entities/card/card-entity-interface';
import { CreateCardUsecaseInterface } from 'src/data/abstract/usecases/card/createCard-usecase-interface';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';

export class CreateCardUsecase implements CreateCardUsecaseInterface {
  private readonly cardRepository: CardRepositoryInterface;
  private readonly cardEntity: CardEntityInterface;

  public constructor(
    cardRepository: CardRepositoryInterface,
    cardEntity: CardEntityInterface,
  ) {
    this.cardRepository = cardRepository;
    this.cardEntity = cardEntity;
  }

  public async execute(
    userId: string,
    cardDto: CreateOrUpdateCardType,
  ): Promise<Card> {
    const enity = this.cardEntity;
    enity.setData(cardDto);
    enity.validate();

    const created = await this.cardRepository.create(userId, enity.getBody());

    return created;
  }
}
