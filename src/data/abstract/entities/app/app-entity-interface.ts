import { App } from 'src/domain/entities/app/app-entity';
import { AppType } from 'src/domain/types/entities/app/app-type';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';

export interface AppEntityInterface {
  setData(passwordDto: CreateOrUpdateAppType): void;
  validate(): void;
  getBody(): AppType;
  updateData(mainData: App): AppType;
  validateUpdate(): void;
}
