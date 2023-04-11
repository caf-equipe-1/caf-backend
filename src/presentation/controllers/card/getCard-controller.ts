import { GetAllCardsUsecaseInterface } from 'src/data/abstract/usecases/card/getAllCards-usecase-interface';
import { GetOneCardUsecaseInterface } from 'src/data/abstract/usecases/card/getOneCard-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Card } from 'src/domain/entities/card/card-entity';
import { GetCardControllerInterface } from 'src/presentation/abstract/controllers/card/getCard-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class GetCardController implements GetCardControllerInterface {
  private readonly getOneCardUsecase: GetOneCardUsecaseInterface;
  private readonly getAllCardsUseCase: GetAllCardsUsecaseInterface;

  public constructor(
    getOneCardUsecase: GetOneCardUsecaseInterface,
    getAllCardsUseCase: GetAllCardsUsecaseInterface,
  ) {
    this.getOneCardUsecase = getOneCardUsecase;
    this.getAllCardsUseCase = getAllCardsUseCase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<Card>> {
    try {
      const getAll = request.userId && !request.id;
      const getOne = request.id && !request.userId;

      switch (true) {
        case getAll:
          const foundCards = this.getAllCardsUseCase.execute(request.userId);
          return Response.ok(foundCards);

        case getOne:
          const foundCard = this.getOneCardUsecase.execute(request.id);
          return Response.ok(foundCard);

        default:
          throw new MissingParamError('Id');
      }
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
