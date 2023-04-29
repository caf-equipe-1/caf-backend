import { TempImageType } from 'src/domain/types/entities/tempImage/tempImage-type';

export interface TempImageRepositoryInterface {
  create(id: string, selfie: string): Promise<TempImageType>;
  getOne(id: string): Promise<TempImageType>;
}
