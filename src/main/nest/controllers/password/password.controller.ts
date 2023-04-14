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
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { CreatePasswordController } from 'src/presentation/controllers/password/createPassword-controller';
import { DeletePasswordController } from 'src/presentation/controllers/password/deletePassword-controller';
import { GetPasswordController } from 'src/presentation/controllers/password/getPassword-controller';
import { UpdatePasswordController } from 'src/presentation/controllers/password/updatePassword-controller';
import { CreatePasswordDto } from '../../dtos/password/createPassword.dto';
import { UpdatePasswordDto } from '../../dtos/password/updatePassword.dto';

@ApiTags('Passwords')
@Controller('/passwords')
export class PasswordController {
  public constructor(
    private readonly createPasswordController: CreatePasswordController,
    private readonly updatePasswordController: UpdatePasswordController,
    private readonly deletePasswordController: DeletePasswordController,
    private readonly getPasswordController: GetPasswordController,
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
    summary: 'Route for the store of a new password info.',
  })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() body: CreatePasswordDto) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdatePasswordType> = {
      userId,
      body,
    };

    return await this.createPasswordController.execute(httpRequest);
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
    summary: 'Route for the update of a password info register.',
  })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto,
  ) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdatePasswordType> = {
      userId,
      id,
      body,
    };

    return await this.updatePasswordController.execute(httpRequest);
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
    summary: 'Route for the deletion of a password info register.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId, id };

    return await this.deletePasswordController.execute(httpRequest);
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
    summary: 'Route to view an unique password info register.',
  })
  @ApiBearerAuth()
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getPasswordController.execute(httpRequest);
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
      'Route to view all the password info registers attributed to the logged user.',
  })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<object> = { userId };

    return await this.getPasswordController.execute(httpRequest);
  }
}
