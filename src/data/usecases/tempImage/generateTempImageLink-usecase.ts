import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { GenerateTempImageLinkUsecaseInterface } from 'src/data/abstract/usecases/tempImage/generateTempImageLink-usecase-interface';
import { TempImageRepositoryInterface } from 'src/infra/abstract/repositories/tempImage/tempImage-repository-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class GenerateTempImageLinkUsecase
  implements GenerateTempImageLinkUsecaseInterface
{
  private readonly tempImageRepository: TempImageRepositoryInterface;
  private readonly idGeneratorAdapter: IdGeneratorAdapterInterface;

  public constructor(
    tempImageRepository: TempImageRepositoryInterface,
    idGeneratorAdapter: IdGeneratorAdapterInterface,
  ) {
    this.tempImageRepository = tempImageRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  public async execute(image: string): Promise<string> {
    const id = this.idGeneratorAdapter.generateId();
    const storedImage = await this.tempImageRepository.create(id, image);

    const backendUrl = `${EnvVariables.getBackendUrl()}/temp-images/${
      storedImage.id
    }`;

    return backendUrl;
  }
}
