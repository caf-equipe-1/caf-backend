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
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { CreateAppController } from 'src/presentation/controllers/app/createApp-controller';
import { DeleteAppController } from 'src/presentation/controllers/app/deleteApp-controller';
import { GetAppController } from 'src/presentation/controllers/app/getApp-controller';
import { UpdateAppController } from 'src/presentation/controllers/app/updateApp-controller';
import { CreateAppDto } from '../../dtos/app/createApp.dto';
import { UpdateAppDto } from '../../dtos/app/updateAp.dto';

@ApiTags('Apps')
@Controller('/apps')
export class AppController {
  public constructor(
    private readonly createAppController: CreateAppController,
    private readonly updateAppController: UpdateAppController,
    private readonly deleteAppController: DeleteAppController,
    private readonly getAppController: GetAppController,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({
    summary: 'Route for the store of a new app name.',
  })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() body: CreateAppDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateAppType> = { userId, body };

    return await this.createAppController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({
    summary: 'Route for the update of an app name register.',
  })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateAppDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdateAppType> = {
      userId,
      id,
      body,
    };

    return await this.updateAppController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({
    summary: 'Route for the deletion of an app name register.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deleteAppController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({
    summary: 'Route to view an unique app name register.',
  })
  @ApiBearerAuth()
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getAppController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({
    summary:
      'Route to view all the app name registers attributed to the logged user.',
  })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getAppController.execute(httpRequest);
  }
}
