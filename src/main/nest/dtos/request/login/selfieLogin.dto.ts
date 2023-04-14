import { ApiProperty } from '@nestjs/swagger';

export class SelfieLoginDto {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  selfie: string;
}
