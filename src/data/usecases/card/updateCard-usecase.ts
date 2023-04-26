import { CardEntityInterface } from 'src/data/abstract/entities/card/card-entity-interface';
import { UpdateCardUsecaseInterface } from 'src/data/abstract/usecases/card/updateCard-usecase-interface';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdateCardUsecase implements UpdateCardUsecaseInterface {
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
    cardId: string,
    cardDto: CreateOrUpdateCardType,
  ): Promise<Card> {
    const found = await this.cardRepository.getOne(cardId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const entity = this.cardEntity;
    entity.setData(cardDto);
    entity.validateUpdate();

    const updated = await this.cardRepository.update(
      cardId,
      entity.updateData(found),
    );

    return updated;
  }
}
