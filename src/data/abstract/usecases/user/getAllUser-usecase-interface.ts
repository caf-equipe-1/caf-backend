import { User } from 'src/domain/entities/user/user-entity';

export interface GetAllUsersUsecaseInterface {
  execute(userId: string): Promise<User[]>;
}
