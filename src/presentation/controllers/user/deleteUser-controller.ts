import { DeleteUserUsecaseInterface } from 'src/data/abstract/usecases/user/deleteUser-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { DeleteUserControllerInterface } from 'src/presentation/abstract/controllers/user/deleteUser-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';

export class DeleteUserController implements DeleteUserControllerInterface {
  private readonly deleteUserUsecase: DeleteUserUsecaseInterface;

  public constructor(deleteUserUsecase: DeleteUserUsecaseInterface) {
    this.deleteUserUsecase = deleteUserUsecase;
  }

  public async execute(request: HttpRequest<{}>): Promise<HttpResponse<User>> {
    try {
      const deletedUser = await this.deleteUserUsecase.execute(request.userId);

      return Response.ok(deletedUser);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
