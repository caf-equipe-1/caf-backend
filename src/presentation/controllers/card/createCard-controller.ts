import { CreateCardUsecaseInterface } from 'src/data/abstract/usecases/card/createCard-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CreateCardControllerInterface } from 'src/presentation/abstract/controllers/card/createCard-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class CreateCardController implements CreateCardControllerInterface {
  private readonly createCardUsecase: CreateCardUsecaseInterface;

  public constructor(createCardUsecase: CreateCardUsecaseInterface) {
    this.createCardUsecase = createCardUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateCardType>,
  ): Promise<HttpResponse<Card>> {
    try {
      if (!request.body) {
        throw new MissingParamError('Request body');
      }

      const createdCard = await this.createCardUsecase.execute(
        request.userId,
        request.body,
      );

      return Response.created(createdCard);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
