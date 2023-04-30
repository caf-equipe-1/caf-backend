import { FileHelperInterface } from 'src/data/abstract/helpers/file/file-helper-interface';
import { GetTempImageUsecaseInterface } from 'src/data/abstract/usecases/tempImage/getTempImage-usecase-interface';
import { ImageDataType } from 'src/domain/types/image/imageData-type';
import { TempImageRepositoryInterface } from 'src/infra/abstract/repositories/tempImage/tempImage-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetTempImageUsecase implements GetTempImageUsecaseInterface {
  private readonly tempImageRepository: TempImageRepositoryInterface;
  private readonly fileHelper: FileHelperInterface;

  public constructor(
    tempImageRepository: TempImageRepositoryInterface,
    fileHelper: FileHelperInterface,
  ) {
    this.tempImageRepository = tempImageRepository;
    this.fileHelper = fileHelper;
  }

  public async execute(id: string): Promise<ImageDataType> {
    const foundTempImage = await this.tempImageRepository.getOne(id);

    if (!foundTempImage) {
      throw new InvalidParamError('Id');
    }

    const file = this.fileHelper;
    file.setFile(foundTempImage.photo);
    const fileInfo = this.fileHelper.getFile();

    return { image: fileInfo.file, imageType: fileInfo.fileType };
  }
}
