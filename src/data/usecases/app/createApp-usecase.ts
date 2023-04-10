import { AppEntityInterface } from 'src/data/abstract/entities/app/app-entity-interface';
import { CreateAppUsecaseInterface } from 'src/data/abstract/usecases/app/createApp-usecase-interface';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';

export class CreateAppUsecase implements CreateAppUsecaseInterface {
  private readonly appRepository: AppRepositoryInterface;
  private readonly appEntity: AppEntityInterface;

  public constructor(
    appRepository: AppRepositoryInterface,
    appEntity: AppEntityInterface,
  ) {
    this.appRepository = appRepository;
    this.appEntity = appEntity;
  }

  public async execute(
    userId: string,
    appDto: CreateOrUpdateAppType,
  ): Promise<App> {
    const enity = this.appEntity;
    enity.setData(appDto);
    enity.validate();

    const created = await this.appRepository.create(userId, enity.getBody());

    return created;
  }
}
