import { Module } from '@nestjs/common';
import { TempImageController } from '../../controllers/tempImage/tempImage.controller';
import { GetTempImageController } from 'src/presentation/controllers/tempImage/getTempImage-controller';
import { makeGetTempImageControllerFactory } from 'src/main/factories/controllers/tempImage/getTempImageController-factory';

@Module({
  controllers: [TempImageController],
  providers: [
    {
      provide: GetTempImageController,
      useFactory: makeGetTempImageControllerFactory,
    },
  ],
})
export class TempImageModule {}
