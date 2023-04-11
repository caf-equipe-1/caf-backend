import { LoggedUserDto } from 'src/domain/dtos/login/loggedUser-dto';
import { SelfieLoginDto } from 'src/domain/dtos/login/selfieLogin-dto';

export interface MakeSelfieLoginUseCaseInterface {
  execute(selfieLoginDto: SelfieLoginDto): Promise<LoggedUserDto>;
}
