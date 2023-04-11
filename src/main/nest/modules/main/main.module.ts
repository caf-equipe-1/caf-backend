import { Module } from '@nestjs/common';
import { MainController } from '../../controllers/main/main.controller';

@Module({
  imports: [],
  controllers: [MainController],
})
export class MainModule {}
