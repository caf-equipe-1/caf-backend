import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';
import { GetUserImageController } from 'src/presentation/controllers/userImage/getUserImage-controller';
import * as fs from 'fs';

@ApiTags('UserImages')
@Controller('/user-images')
export class UserImageController {
  constructor(
    private readonly getUserImageController: GetUserImageController,
  ) {}

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
  @ApiOperation({
    summary: 'Route to view an user image.',
  })
  @Get(':id')
  public async getOne(@Param('id') id: string, @Res() res: Response) {
    const httpRequest: HttpRequest<object> = { id };

    const response = await this.getUserImageController.execute(httpRequest);

    res.type('text/html');

    res.send(`
      <html>
        <head>
          <title>Imagem</title>
        </head>
        <body>
          <img src="${response.body}" />
        </body>
      </html>
    `);
  }
}
