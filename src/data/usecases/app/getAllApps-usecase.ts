import { GetAllAppsUsecaseInterface } from 'src/data/abstract/usecases/app/getAllApps-usecase-interface';
import { App } from 'src/domain/entities/app/app-entity';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';

export class GetAllAppsUsecase implements GetAllAppsUsecaseInterface {
  private readonly appRepository: AppRepositoryInterface;

  public constructor(appRepository: AppRepositoryInterface) {
    this.appRepository = appRepository;
  }

  public async execute(userId: string): Promise<App[]> {
    const found = await this.appRepository.getAll(userId);

    return found;
  }
}
