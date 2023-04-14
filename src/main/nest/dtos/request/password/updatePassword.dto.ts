import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  password?: string;
}
