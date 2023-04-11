import { UpdateCardUsecaseInterface } from 'src/data/abstract/usecases/card/updateCard-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { UpdateCardControllerInterface } from 'src/presentation/abstract/controllers/card/updateCard-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class UpdateCardController implements UpdateCardControllerInterface {
  private readonly updateCardUsecase: UpdateCardUsecaseInterface;

  public constructor(updateCardUsecase: UpdateCardUsecaseInterface) {
    this.updateCardUsecase = updateCardUsecase;
  }

  public async execute(
    request: HttpRequest<CreateOrUpdateCardType>,
  ): Promise<HttpResponse<Card>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        case !request.id:
          throw new MissingParamError('Id');

        default:
          break;
      }

      const updatedCard = await this.updateCardUsecase.execute(
        request.id,
        request.body,
      );

      return Response.ok(updatedCard);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
