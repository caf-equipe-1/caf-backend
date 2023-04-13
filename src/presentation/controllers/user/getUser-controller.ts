import { GetAllUsersUsecaseInterface } from 'src/data/abstract/usecases/user/getAllUser-usecase-interface';
import { GetOneUserUsecaseInterface } from 'src/data/abstract/usecases/user/getOneUser-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { GetUserControllerInterface } from 'src/presentation/abstract/controllers/user/getUser-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { UnauthorizedError } from 'src/utils/errors/unauthorized-error';

export class GetUserController implements GetUserControllerInterface {
  private readonly getOneUserUsecase: GetOneUserUsecaseInterface;
  private readonly getAllUsersUseCase: GetAllUsersUsecaseInterface;

  public constructor(
    getOneUserUsecase: GetOneUserUsecaseInterface,
    getAllUsersUseCase: GetAllUsersUsecaseInterface,
  ) {
    this.getOneUserUsecase = getOneUserUsecase;
    this.getAllUsersUseCase = getAllUsersUseCase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<User>> {
    try {
      const getOne = request.hasOwnProperty('id');

      switch (true) {
        case getOne:
          const foundUser = await this.getOneUserUsecase.execute(request.id);
          return Response.ok(foundUser);

        default:
          throw new UnauthorizedError(
            'You do not have authorization to view all users.',
          );
      }
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
