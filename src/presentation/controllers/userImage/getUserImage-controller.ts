import { GetUserImageUsecaseInterface } from 'src/data/abstract/usecases/userImage/getUserImage-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { GetUserImageControllerInterface } from 'src/presentation/abstract/controllers/userImage/getUserImage-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';

export class GetUserImageController implements GetUserImageControllerInterface {
  private readonly getUserImageUsecase: GetUserImageUsecaseInterface;

  public constructor(getUserImageUsecase: GetUserImageUsecaseInterface) {
    this.getUserImageUsecase = getUserImageUsecase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<string>> {
    try {
      const userImage = await this.getUserImageUsecase.execute(
        request.id || '',
      );

      return Response.ok(userImage);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
