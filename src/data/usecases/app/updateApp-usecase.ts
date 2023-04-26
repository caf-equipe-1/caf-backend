import { AppEntityInterface } from 'src/data/abstract/entities/app/app-entity-interface';
import { UpdateAppUsecaseInterface } from 'src/data/abstract/usecases/app/updateApp-usecase-interface';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { AppRepositoryInterface } from 'src/infra/abstract/repositories/app/app-repository-interface';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class UpdateAppUsecase implements UpdateAppUsecaseInterface {
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
    appId: string,
    appDto: CreateOrUpdateAppType,
  ): Promise<App> {
    const found = await this.appRepository.getOne(appId);

    if (!found) {
      throw new InvalidParamError('Id');
    }

    const entity = this.appEntity;
    entity.setData(appDto);
    entity.validateUpdate();

    const updated = await this.appRepository.update(
      appId,
      entity.updateData(found),
    );

    return updated;
  }
}
