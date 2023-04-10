import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';

export interface CreateAppUsecaseInterface {
  execute(appDto: CreateOrUpdateAppType): Promise<App>;
}
