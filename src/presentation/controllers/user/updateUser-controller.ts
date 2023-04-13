import { UpdateUserUsecaseInterface } from 'src/data/abstract/usecases/user/updateUser-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { UpdateUserControllerInterface } from 'src/presentation/abstract/controllers/user/updateUser-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class UpdateUserController implements UpdateUserControllerInterface {
  private readonly updateUserUsecase: UpdateUserUsecaseInterface;

  public constructor(updateUserUsecase: UpdateUserUsecaseInterface) {
    this.updateUserUsecase = updateUserUsecase;
  }

  public async execute(
    request: HttpRequest<UpdateProfileDto>,
  ): Promise<HttpResponse<User>> {
    try {
      switch (true) {
        case !request.body:
          throw new MissingParamError('Request body');

        default:
          break;
      }

      const updatedUser = await this.updateUserUsecase.execute(
        request.id || '',
        request.body,
      );

      return Response.ok(updatedUser);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
