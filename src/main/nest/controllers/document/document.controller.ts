import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { CreateOrUpdateDocumentType } from 'src/domain/types/entities/document/createOrUpdateDocument-type';
import { CreateDocumentController } from 'src/presentation/controllers/document/createDocument-controller';
import { DeleteDocumentController } from 'src/presentation/controllers/document/deleteDocument-controller';
import { GetDocumentController } from 'src/presentation/controllers/document/getDocument-controller';
import { UpdateDocumentController } from 'src/presentation/controllers/document/updateDocument-controller';
import { CreateDocumentDto } from '../../dtos/request/document/createDocument.dto';
import { UpdateDocumentDto } from '../../dtos/request/document/updateDocument.dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';

@ApiTags('Documents')
@Controller('/documents')
export class DocumentController {
  public constructor(
    private readonly createDocumentController: CreateDocumentController,
    private readonly updateDocumentController: UpdateDocumentController,
    private readonly deleteDocumentController: DeleteDocumentController,
    private readonly getDocumentController: GetDocumentController,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: makeHttpResponseDto('document'),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary: 'Route for the store of a new document.',
  })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() body: CreateDocumentDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateDocumentType> = {
      userId,
      body,
    };

    return await this.createDocumentController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('document'),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary: 'Route for the update of a document register.',
  })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateDocumentDto,
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

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('document'),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary: 'Route for the deletion of a document register.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteDocumentController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('document'),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary: 'Route to view an unique document register.',
  })
  @ApiBearerAuth()
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getDocumentController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('document', true),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary:
      'Route to view all the document registers attributed to the logged user.',
  })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getDocumentController.execute(httpRequest);
  }
}
