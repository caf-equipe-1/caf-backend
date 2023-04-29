import { ImageDataType } from 'src/domain/types/image/imageData-type';

export interface GetTempImageUsecaseInterface {
  execute(id: string): Promise<ImageDataType>;
}
