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
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { CreateUserController } from 'src/presentation/controllers/user/createUser-controller';
import { DeleteUserController } from 'src/presentation/controllers/user/deleteUser-controller';
import { GetUserController } from 'src/presentation/controllers/user/getUser-controller';
import { UpdateUserController } from 'src/presentation/controllers/user/updateUser-controller';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  public constructor(
    private readonly createUserController: CreateUserController,
    private readonly updateUserController: UpdateUserController,
    private readonly deleteUserController: DeleteUserController,
    private readonly getUserController: GetUserController,
  ) {}

  @Post()
  public async create(@Body() body: CreateProfileDto) {
    const httpRequest: HttpRequest<CreateProfileDto> = { body };

    return await this.createUserController.execute(httpRequest);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    const httpRequest: HttpRequest<UpdateProfileDto> = {
      id,
      body,
    };

    return await this.updateUserController.execute(httpRequest);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.deleteUserController.execute(httpRequest);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<object> = { id };

    return await this.getUserController.execute(httpRequest);
  }
}
