import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppDto {
  @ApiProperty()
  name?: string;
}
