import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { makeCreateDocumentControllerFactory } from 'src/main/factories/controllers/document/createDocumentController-factory';
import { makeDeleteDocumentControllerFactory } from 'src/main/factories/controllers/document/deleteDocumentController-factory';
import { makeGetDocumentControllerFactory } from 'src/main/factories/controllers/document/getDocumentController-factory';
import { makeUpdateDocumentControllerFactory } from 'src/main/factories/controllers/document/updateDocumentController-factory';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';
import { DocumentController } from '../../controllers/document/document.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  controllers: [DocumentController],
  providers: [
    {
      provide: CreateDocumentController,
      useFactory: makeCreateDocumentControllerFactory,
    },
    {
      provide: UpdateDocumentController,
      useFactory: makeUpdateDocumentControllerFactory,
    },
    {
      provide: DeleteDocumentController,
      useFactory: makeDeleteDocumentControllerFactory,
    },
    {
      provide: GetDocumentController,
      useFactory: makeGetDocumentControllerFactory,
    },
  ],
})
export class DocumentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
