import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';

export interface UpdateAppUsecaseInterface {
  execute(appId: string, appDto: CreateOrUpdateAppType): Promise<App>;
}
