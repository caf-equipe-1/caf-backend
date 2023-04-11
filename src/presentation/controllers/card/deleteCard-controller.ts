import { DeleteCardUsecaseInterface } from 'src/data/abstract/usecases/card/deleteCard-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { DeleteCardControllerInterface } from 'src/presentation/abstract/controllers/card/deleteCard-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class DeleteCardController implements DeleteCardControllerInterface {
  private readonly deleteCardUsecase: DeleteCardUsecaseInterface;

  public constructor(deleteCardUsecase: DeleteCardUsecaseInterface) {
    this.deleteCardUsecase = deleteCardUsecase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<Card>> {
    try {
      if (!request.id) {
        throw new MissingParamError('Id');
      }

      const deletedCard = await this.deleteCardUsecase.execute(request.id);

      return Response.ok(deletedCard);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
