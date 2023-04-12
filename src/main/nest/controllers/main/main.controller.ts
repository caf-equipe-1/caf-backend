import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Main')
@Controller()
export class MainController {
  @Get()
  getStatus(): string {
    return 'Server is running...';
  }
}
