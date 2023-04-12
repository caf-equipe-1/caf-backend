import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { CreatePasswordController } from 'src/presentation/controllers/password/createPassword-controller';
import { DeletePasswordController } from 'src/presentation/controllers/password/deletePassword-controller';
import { GetPasswordController } from 'src/presentation/controllers/password/getPassword-controller';
import { UpdatePasswordController } from 'src/presentation/controllers/password/updatePassword-controller';

@Controller('/password')
export class PasswordController {
  public constructor(
    private readonly createPasswordController: CreatePasswordController,
    private readonly updatePasswordController: UpdatePasswordController,
    private readonly deletePasswordController: DeletePasswordController,
    private readonly getPasswordController: GetPasswordController,
  ) {}

  @Post()
  public async create(@Body() body: CreateOrUpdatePasswordType) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<CreateOrUpdatePasswordType> = {
      userId,
      body,
    };

    return await this.createPasswordController.execute(httpRequest);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: CreateOrUpdatePasswordType,
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

  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<{}> = { userId, id };

    return await this.deletePasswordController.execute(httpRequest);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const httpRequest: HttpRequest<{}> = { id };

    return await this.getPasswordController.execute(httpRequest);
  }

  @Get()
  public async getAll(@Body() body: any) {
    const requestBody: any = body;
    const userId = requestBody.userId;
    const httpRequest: HttpRequest<{}> = { userId };

    return await this.getPasswordController.execute(httpRequest);
  }
}
