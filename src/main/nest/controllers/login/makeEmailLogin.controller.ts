import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailLoginController } from 'src/presentation/controllers/login/emailLogin-controller';
import { EmailLoginDto } from '../../dtos/request/login/emailLogin.dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';

@ApiTags('EmailLogin')
@Controller('/login/email')
export class MakeEmailLoginController {
  public constructor(
    private readonly emailLoginController: EmailLoginController,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Ok.',
    schema: makeHttpResponseDto('login'),
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: makeHttpResponseDto(),
  })
  @ApiOperation({
    summary: 'Simple login route by email and password.',
  })
  @Post()
  public async login(@Body() body: EmailLoginDto) {
    return await this.emailLoginController.execute({ body });
  }
}
