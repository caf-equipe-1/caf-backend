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
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { CreateAppController } from 'src/presentation/controllers/app/createApp-controller';
import { DeleteAppController } from 'src/presentation/controllers/app/deleteApp-controller';
import { GetAppController } from 'src/presentation/controllers/app/getApp-controller';
import { UpdateAppController } from 'src/presentation/controllers/app/updateApp-controller';

@ApiTags('Apps')
@Controller('/apps')
export class AppController {
  public constructor(
    private readonly createAppController: CreateAppController,
    private readonly updateAppController: UpdateAppController,
    private readonly deleteAppController: DeleteAppController,
    private readonly getAppController: GetAppController,
  ) {}

  @Post()
  public async create(@Body() body: CreateOrUpdateAppType) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateAppType> = { userId, body };

    return await this.createAppController.execute(httpRequest);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: CreateOrUpdateAppType,
  ) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateAppType> = {
      userId,
      id,
      body,
    };

    return await this.updateAppController.execute(httpRequest);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteAppController.execute(httpRequest);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getAppController.execute(httpRequest);
  }

  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getAppController.execute(httpRequest);
  }
}
