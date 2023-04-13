import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { EmailLoginController } from 'src/presentation/controllers/login/emailLogin-controller';

@ApiTags('EmailLogin')
@Controller('/login/email')
export class MakeEmailLoginController {
  public constructor(
    private readonly emailLoginController: EmailLoginController,
  ) {}

  @Post()
  public async login(@Body() body: EmailLoginDto) {
    return await this.emailLoginController.execute({ body });
  }
}
