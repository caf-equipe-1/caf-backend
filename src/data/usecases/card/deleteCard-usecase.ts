import { DeleteCardUsecaseInterface } from 'src/data/abstract/usecases/card/deleteCard-usecase-interface';
import { Card } from 'src/domain/entities/card/card-entity';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class DeleteCardUsecase implements DeleteCardUsecaseInterface {
  private readonly cardRepository: CardRepositoryInterface;

  public constructor(cardRepository: CardRepositoryInterface) {
    this.cardRepository = cardRepository;
  }

  public async execute(cardId: string): Promise<Card> {
    const found = await this.cardRepository.getOne(cardId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const deleted = await this.cardRepository.delete(cardId);

    return deleted;
  }
}
