import { App } from 'src/domain/entities/app/app-entity';

export interface GetOneAppUsecaseInterface {
  execute(appId: string): Promise<App>;
}
