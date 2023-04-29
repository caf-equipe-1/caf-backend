import { GetTempImageUsecaseInterface } from 'src/data/abstract/usecases/tempImage/getTempImage-usecase-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { ImageDataType } from 'src/domain/types/image/imageData-type';
import { GetTempImageControllerInterface } from 'src/presentation/abstract/controllers/tempImage/getTempImage-controller-interface';
import { Response } from 'src/presentation/helpers/http/response';

export class GetTempImageController implements GetTempImageControllerInterface {
  private readonly getTempImageUsecase: GetTempImageUsecaseInterface;

  public constructor(getTempImageUsecase: GetTempImageUsecaseInterface) {
    this.getTempImageUsecase = getTempImageUsecase;
  }

  public async execute(
    request: HttpRequest<{}>,
  ): Promise<HttpResponse<ImageDataType>> {
    try {
      const tempImage = await this.getTempImageUsecase.execute(
        request.id || '',
      );

      return Response.ok(tempImage);
    } catch (error) {
      return Response.badRequest(error.message);
    }
  }
}
