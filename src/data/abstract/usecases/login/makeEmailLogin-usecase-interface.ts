import { EmailLoginDto } from 'src/domain/dtos/login/emailLogin-dto';
import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';

export interface MakeEmailLoginUseCaseInterface {
  execute(emailLoginDto: EmailLoginDto): Promise<LoggedUserDto>;
}
