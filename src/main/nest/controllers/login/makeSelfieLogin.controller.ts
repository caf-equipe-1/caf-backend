import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';
import { SelfieLoginController } from 'src/presentation/controllers/login/selfieLogin-controller';

@ApiTags('SelfieLogin')
@Controller('/login/selfie')
export class MakeSelfieLoginController {
  public constructor(
    private readonly selfieLoginController: SelfieLoginController,
  ) {}

  @Post()
  public async login(@Body() body: SelfieLoginDto) {
    return await this.selfieLoginController.execute({ body });
  }
}
