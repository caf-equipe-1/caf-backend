import { App } from 'src/domain/entities/app/app-entity';
import { AppType } from 'src/domain/types/entities/app/app-type';

export interface AppRepositoryInterface {
  create(userId: string, appData: AppType): Promise<App>;
  getOne(appId: string): Promise<App>;
  getAll(userId: string): Promise<App[]>;
  delete(appId: string): Promise<App>;
  update(appId: string, appData: AppType): Promise<App>;
}
