import { App } from 'src/domain/entities/app/app-entity';

export interface GetAllAppsUsecaseInterface {
  execute(userId: string): Promise<App[]>;
}
