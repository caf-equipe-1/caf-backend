import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';
@ApiTags('Document')
@Controller('/document')
export class DocumentController {
  public constructor(
    private readonly createDocumentController: CreateDocumentController,
    private readonly updateDocumentController: UpdateDocumentController,
    private readonly deleteDocumentController: DeleteDocumentController,
    private readonly getDocumentController: GetDocumentController,
  ) {}

  @Post()
  public async create(@Body() body: CreateOrUpdateDocumentType) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateDocumentType> = {
      userId,
      body,
    };

    return await this.createDocumentController.execute(httpRequest);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: CreateOrUpdateDocumentType,
  ) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateDocumentType> = {
      userId,
      id,
      body,
    };

    return await this.updateDocumentController.execute(httpRequest);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteDocumentController.execute(httpRequest);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getDocumentController.execute(httpRequest);
  }

  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getDocumentController.execute(httpRequest);
  }
}
