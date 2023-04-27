import { TempImageType } from 'src/domain/types/entities/tempImage/tempImage-type';

export interface TempImageRepositoryInterface {
  create(userId: string, selfie: string): Promise<TempImageType>;
  getOne(userId: string): Promise<TempImageType>;
}
