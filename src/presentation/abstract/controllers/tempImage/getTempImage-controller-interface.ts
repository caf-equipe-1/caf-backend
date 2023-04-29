import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';
import { ImageDataType } from 'src/domain/types/image/imageData-type';

export interface GetTempImageControllerInterface {
  execute(request: HttpRequest<{}>): Promise<HttpResponse<ImageDataType>>;
}
