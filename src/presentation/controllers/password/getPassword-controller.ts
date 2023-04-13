import { GetAllPasswordsUsecaseInterface } from 'src/data/abstract/usecases/password/getAllPassword-usecase-interface';
import { GetOnePasswordUsecaseInterface } from 'src/data/abstract/usecases/password/getOnePassword-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { Password } from 'src/domain/entities/password/password-entity';
import { GetPasswordControllerInterface } from 'src/presentation/abstract/controllers/password/getPassword-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';
import { MissingParamError } from 'src/utils/errors/missingParam-error';

export class GetPasswordController implements GetPasswordControllerInterface {
  private readonly getOnePasswordUsecase: GetOnePasswordUsecaseInterface;
  private readonly getAllPasswordsUseCase: GetAllPasswordsUsecaseInterface;

  public constructor(
    getOnePasswordUsecase: GetOnePasswordUsecaseInterface,
    getAllPasswordsUseCase: GetAllPasswordsUsecaseInterface,
  ) {
    this.getOnePasswordUsecase = getOnePasswordUsecase;
    this.getAllPasswordsUseCase = getAllPasswordsUseCase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<Password>> {
    try {
      const getAll = request.userId && !request.id;
      const getOne = request.id && !request.userId;

      switch (true) {
        case getAll:
          const foundPasswords = await this.getAllPasswordsUseCase.execute(
            request.userId,
          );
          return Response.ok(foundPasswords);

        case getOne:
          const foundPassword = await this.getOnePasswordUsecase.execute(
            request.id,
          );
          return Response.ok(foundPassword);

        default:
          throw new MissingParamError('Id');
      }
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
