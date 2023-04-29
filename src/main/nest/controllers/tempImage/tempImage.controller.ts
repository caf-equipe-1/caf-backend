import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';
import { GetTempImageController } from 'src/presentation/controllers/tempImage/getTempImage-controller';

@ApiTags('TempImages')
@Controller('/user-images')
export class TempImageController {
  constructor(
    private readonly getTempImageController: GetTempImageController,
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

    const { body } = await this.getTempImageController.execute(httpRequest);
    const image = body.image;
    const imageType = body.imageType;

    const binaryData = Buffer.from(image, 'base64');

    res.setHeader('Content-Type', `image/${imageType}`);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=image.${imageType}`,
    );
    res.send(binaryData);
  }
}
