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
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CreateCardController } from 'src/presentation/controllers/card/createCard-controller';
import { DeleteCardController } from 'src/presentation/controllers/card/deleteCard-controller';
import { GetCardController } from 'src/presentation/controllers/card/getCard-controller';
import { UpdateCardController } from 'src/presentation/controllers/card/updateCard-controller';
import { CreateCardDto } from '../../dtos/request/card/createCard.dto';
import { UpdateCardDto } from '../../dtos/request/card/updateCard.dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';

@ApiTags('Cards')
@Controller('/cards')
export class CardController {
  public constructor(
    private readonly createCardController: CreateCardController,
    private readonly updateCardController: UpdateCardController,
    private readonly deleteCardController: DeleteCardController,
    private readonly getCardController: GetCardController,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: makeHttpResponseDto('card'),
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
    summary: 'Route for the store of a new credit card info.',
  })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() body: CreateCardDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateCardType> = { userId, body };

    return await this.createCardController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('card'),
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
    summary: 'Route for the update of a credit card register.',
  })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateCardDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateCardType> = {
      userId,
      id,
      body,
    };

    return await this.updateCardController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('card'),
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
    summary: 'Route for the deletion of a credit card register.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteCardController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('card'),
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
    summary: 'Route to view an unique credit card register.',
  })
  @ApiBearerAuth()
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getCardController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('card', true),
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
      'Route to view all the credit card registers attributed to the logged user.',
  })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getCardController.execute(httpRequest);
  }
}
