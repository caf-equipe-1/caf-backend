import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { makeCreateCardControllerFactory } from 'src/main/factories/controllers/card/createCardController-factory';
import { makeDeleteCardControllerFactory } from 'src/main/factories/controllers/card/deleteCardController-factory';
import { makeGetCardControllerFactory } from 'src/main/factories/controllers/card/getCardController-factory';
import { makeUpdateCardControllerFactory } from 'src/main/factories/controllers/card/updateCardController-factory';
import { CreateCardController } from 'src/presentation/controllers/card/createCard-controller';
import { DeleteCardController } from 'src/presentation/controllers/card/deleteCard-controller';
import { GetCardController } from 'src/presentation/controllers/card/getCard-controller';
import { UpdateCardController } from 'src/presentation/controllers/card/updateCard-controller';
import { CardController } from '../../controllers/card/card.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  controllers: [CardController],
  providers: [
    {
      provide: CreateCardController,
      useFactory: makeCreateCardControllerFactory,
    },
    {
      provide: UpdateCardController,
      useFactory: makeUpdateCardControllerFactory,
    },
    {
      provide: DeleteCardController,
      useFactory: makeDeleteCardControllerFactory,
    },
    {
      provide: GetCardController,
      useFactory: makeGetCardControllerFactory,
    },
  ],
})
export class CardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
