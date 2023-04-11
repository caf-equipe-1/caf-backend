import { Module } from '@nestjs/common';
import { makeCreateDocumentControllerFactory } from 'src/main/factories/controllers/document/createDocumentController-factory';
import { makeDeleteDocumentControllerFactory } from 'src/main/factories/controllers/document/deleteDocumentController-factory';
import { makeGetDocumentControllerFactory } from 'src/main/factories/controllers/document/getDocumentController-factory';
import { makeUpdateDocumentControllerFactory } from 'src/main/factories/controllers/document/updateDocumentController-factory';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';

@Module({
  controllers: [],
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
export class DocumentModule {}
