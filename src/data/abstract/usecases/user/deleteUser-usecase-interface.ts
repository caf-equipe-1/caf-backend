import { User } from 'src/domain/entities/user/user-entity';

export interface DeleteUserUsecaseInterface {
  execute(userId: string): Promise<User>;
}
