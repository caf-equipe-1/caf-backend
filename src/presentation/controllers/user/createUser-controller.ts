import { CreateUserUsecaseInterface } from 'src/data/abstract/usecases/user/createUser-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';
import { CreateUserControllerInterface } from 'src/presentation/abstract/controllers/user/createUser-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class CreateUserController implements CreateUserControllerInterface {
  private readonly createUserUsecase: CreateUserUsecaseInterface;

  public constructor(createUserUsecase: CreateUserUsecaseInterface) {
    this.createUserUsecase = createUserUsecase;
  }

  public async execute(
    request: HttpRequest<CreateProfileDto>,
  ): Promise<HttpResponse<User>> {
    try {
      if (!request.body) {
        throw new MissingParamError('Request body');
      }

      const createdUser = await this.createUserUsecase.execute(request.body);

      return Response.created(createdUser);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
