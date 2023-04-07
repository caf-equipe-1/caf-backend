import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';

export type RegisterLockedAppsDto = {
  appNames: CreateOrUpdateAppType[];
};
