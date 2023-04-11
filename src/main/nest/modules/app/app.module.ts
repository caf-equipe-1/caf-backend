import { Module } from '@nestjs/common';
import { makeCreateAppControllerFactory } from 'src/main/factories/controllers/app/createAppController-factory';
import { makeDeleteAppControllerFactory } from 'src/main/factories/controllers/app/deleteAppController-factory';
import { makeGetAppControllerFactory } from 'src/main/factories/controllers/app/getAppController-factory';
import { makeUpdateAppControllerFactory } from 'src/main/factories/controllers/app/updateAppController-factory';
import { CreateAppController } from 'src/presentation/controllers/app/createApp-controller';
import { DeleteAppController } from 'src/presentation/controllers/app/deleteApp-controller';
import { GetAppController } from 'src/presentation/controllers/app/getApp-controller';
import { UpdateAppController } from 'src/presentation/controllers/app/updateApp-controller';

@Module({
  controllers: [],
  providers: [
    {
      provide: CreateAppController,
      useFactory: makeCreateAppControllerFactory,
    },
    {
      provide: UpdateAppController,
      useFactory: makeUpdateAppControllerFactory,
    },
    {
      provide: DeleteAppController,
      useFactory: makeDeleteAppControllerFactory,
    },
    {
      provide: GetAppController,
      useFactory: makeGetAppControllerFactory,
    },
  ],
})
export class AppModule {}
