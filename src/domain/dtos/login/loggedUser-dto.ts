import { User } from 'src/domain/entities/user/user-entity';

export type LoggedUserDto = {
  token: string;
  user: User;
};
