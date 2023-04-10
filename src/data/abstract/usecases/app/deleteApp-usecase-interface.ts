import { App } from 'src/domain/entities/app/app-entity';

export interface DeleteAppUsecaseInterface {
  execute(appId: string): Promise<App>;
}
