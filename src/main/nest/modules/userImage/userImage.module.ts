import { Module } from '@nestjs/common';
import { UserImageController } from '../../controllers/userImage/userImage.controller';
import { GetUserImageController } from 'src/presentation/controllers/userImage/getUserImage-controller';
import { makeGetUserImageControllerFactory } from 'src/main/factories/controllers/userImage/getUserImageController-factory';

@Module({
  controllers: [UserImageController],
  providers: [
    {
      provide: GetUserImageController,
      useFactory: makeGetUserImageControllerFactory,
    },
  ],
})
export class UserImageModule {}
