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
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';
import { DeleteUserController } from 'src/presentation/controllers/user/deleteUser-controller';
import { GetUserController } from 'src/presentation/controllers/user/getUser-controller';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';
import { CreateUserDto } from '../../dtos/request/user/createUser.dto';
import { UpdateUserDto } from '../../dtos/request/user/updateUser.dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  public constructor(
    private readonly createUserController: CreateUserController,
    private readonly updateUserController: UpdateUserController,
    private readonly deleteUserController: DeleteUserController,
    private readonly getUserController: GetUserController,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: makeHttpResponseDto('user'),
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
    summary: 'Route for the creation of a new user.',
  })
  @Post()
  public async create(@Body() body: CreateUserDto) {
    const httpRequest: HttpRequest<CreateProfileDto> = { body };

    return await this.createUserController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('user'),
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
    summary: 'Route for the update of an user register.',
  })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const httpRequest: HttpRequest<UpdateProfileDto> = {
      id,
      body,
    };

    return await this.updateUserController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('user'),
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
    summary: 'Route for the deletion of an user register.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.deleteUserController.execute(httpRequest);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('user'),
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
    summary: 'Route to view an unique user info.',
  })
  @ApiBearerAuth()
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getUserController.execute(httpRequest);
  }
}
