import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailLoginController } from 'src/presentation/controllers/login/emailLogin-controller';
import { EmailLoginDto } from '../../dtos/login/emailLogin.dto';

@ApiTags('EmailLogin')
@Controller('/login/email')
export class MakeEmailLoginController {
  public constructor(
    private readonly emailLoginController: EmailLoginController,
  ) {}

  @ApiOperation({
    summary: 'Simple login route by email and password.',
  })
  @Post()
  public async login(@Body() body: EmailLoginDto) {
    return await this.emailLoginController.execute({ body });
  }
}
