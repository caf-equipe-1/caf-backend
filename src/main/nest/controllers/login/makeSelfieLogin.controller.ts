import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';
import { SelfieLoginDto } from '../../dtos/login/selfieLogin.dto';

@ApiTags('SelfieLogin')
@Controller('/login/selfie')
export class MakeSelfieLoginController {
  public constructor(
    private readonly selfieLoginController: SelfieLoginController,
  ) {}

  @ApiOperation({
    summary: 'Login route by cpf and a selfie.',
  })
  @Post()
  public async login(@Body() body: SelfieLoginDto) {
    return await this.selfieLoginController.execute({ body });
  }
}
