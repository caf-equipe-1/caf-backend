import { GenerateUserImageLinkUsecaseInterface } from 'src/data/abstract/usecases/userImage/generateUserImageLink-usecase-interface';
import { TempImageRepositoryInterface } from 'src/infra/abstract/repositories/tempImage/tempImage-repository-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class GenerateUserImageLinkUsecase
  implements GenerateUserImageLinkUsecaseInterface
{
  private readonly tempImageRepository: TempImageRepositoryInterface;

  public constructor(tempImageRepository: TempImageRepositoryInterface) {
    this.tempImageRepository = tempImageRepository;
  }

  public async execute(userId: string, image: string): Promise<string> {
    const storedImage = await this.tempImageRepository.create(userId, image);

    const backendUrl = `${EnvVariables.getBackendUrl()}/user-images/${
      storedImage.userId
    }`;

    return backendUrl;
  }
}
