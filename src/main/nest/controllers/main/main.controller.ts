import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class MainController {
  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiOperation({
    summary: 'Api test route.',
  })
  @Get()
  getStatus(): string {
    return 'Server is running...';
  }
}
