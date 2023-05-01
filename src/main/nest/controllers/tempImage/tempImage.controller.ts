import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { GetTempImageController } from 'src/presentation/controllers/tempImage/getTempImage-controller';

@Controller('/temp-images')
export class TempImageController {
  constructor(
    private readonly getTempImageController: GetTempImageController,
  ) {}

  @ApiExcludeEndpoint()
  @Get(':id')
  public async getOne(@Param('id') id: string, @Res() res: Response) {
    const httpRequest: HttpRequest<object> = { id };
    const { body } = await this.getTempImageController.execute(httpRequest);

    if (!body || !body.image || !body.imageType) {
      res.status(404).send({ message: 'Image not found' });
    }

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
