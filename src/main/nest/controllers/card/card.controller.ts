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
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CreateCardController } from 'src/presentation/controllers/card/createCard-controller';
import { DeleteCardController } from 'src/presentation/controllers/card/deleteCard-controller';
import { GetCardController } from 'src/presentation/controllers/card/getCard-controller';
import { UpdateCardController } from 'src/presentation/controllers/card/updateCard-controller';

@ApiTags('Cards')
@Controller('/cards')
export class CardController {
  public constructor(
    private readonly createCardController: CreateCardController,
    private readonly updateCardController: UpdateCardController,
    private readonly deleteCardController: DeleteCardController,
    private readonly getCardController: GetCardController,
  ) {}

  @Post()
  public async create(@Body() body: CreateOrUpdateCardType) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateCardType> = { userId, body };

    return await this.createCardController.execute(httpRequest);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: CreateOrUpdateCardType,
  ) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateCardType> = {
      userId,
      id,
      body,
    };

    return await this.updateCardController.execute(httpRequest);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteCardController.execute(httpRequest);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getCardController.execute(httpRequest);
  }

  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getCardController.execute(httpRequest);
  }
}
