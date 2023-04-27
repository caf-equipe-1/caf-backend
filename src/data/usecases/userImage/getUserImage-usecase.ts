import { GetUserImageUsecaseInterface } from 'src/data/abstract/usecases/userImage/getUserImage-usecase-interface';
import { TempImageRepositoryInterface } from 'src/infra/abstract/repositories/tempImage/tempImage-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetUserImageUsecase implements GetUserImageUsecaseInterface {
  private readonly tempImageRepository: TempImageRepositoryInterface;

  public constructor(tempImageRepository: TempImageRepositoryInterface) {
    this.tempImageRepository = tempImageRepository;
  }

  public async execute(userId: string): Promise<string> {
    const foundUserImage = await this.tempImageRepository.getOne(userId);

    if (!foundUserImage) {
      throw new InvalidParamError('Id');
    }

    return foundUserImage.photo;
  }
}
