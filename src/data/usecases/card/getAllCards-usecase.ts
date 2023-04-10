import { GetAllCardsUsecaseInterface } from 'src/data/abstract/usecases/card/getAllCards-usecase-interface';
import { Card } from 'src/domain/entities/card/card-entity';
import { CardRepositoryInterface } from 'src/infra/abstract/repositories/card/card-repository-interface';

export class GetAllCardsUsecase implements GetAllCardsUsecaseInterface {
  private readonly cardRepository: CardRepositoryInterface;

  public constructor(cardRepository: CardRepositoryInterface) {
    this.cardRepository = cardRepository;
  }

  public async execute(userId: string): Promise<Card[]> {
    const found = await this.cardRepository.getAll(userId);

    return found;
  }
}
