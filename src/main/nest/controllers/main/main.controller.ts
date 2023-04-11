import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  @Get()
  getStatus(): string {
    return 'Server is running...';
  }
}
