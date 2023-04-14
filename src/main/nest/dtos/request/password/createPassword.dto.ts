import { ApiProperty } from '@nestjs/swagger';

export class CreatePasswordDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
