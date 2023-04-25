import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  securityCode: number;

  @ApiProperty()
  password: number;
}
