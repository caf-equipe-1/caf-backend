import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';
import { SelfieLoginDto } from '../../dtos/request/login/selfieLogin.dto';
import { makeHttpResponseDto } from '../../dtos/response/http/httpResponse.dto';

@ApiTags('SelfieLogin')
@Controller('/login/selfie')
export class MakeSelfieLoginController {
  public constructor(
    private readonly selfieLoginController: SelfieLoginController,
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
    summary: 'Login route by cpf and a selfie.',
  })
  @Post()
  public async login(@Body() body: SelfieLoginDto) {
    return await this.selfieLoginController.execute({ body });
  }
}
