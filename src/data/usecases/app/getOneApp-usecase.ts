import { GetOneAppUsecaseInterface } from 'src/data/abstract/usecases/app/getOneApp-usecase-interface';
import { App } from 'src/domain/entities/app/app-entity';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class GetOneAppUsecase implements GetOneAppUsecaseInterface {
  private readonly appRepository: AppRepositoryInterface;

  public constructor(appRepository: AppRepositoryInterface) {
    this.appRepository = appRepository;
  }

  public async execute(appId: string): Promise<App> {
    const found = await this.appRepository.getOne(appId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    return found;
  }
}
