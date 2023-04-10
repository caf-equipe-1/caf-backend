import { User } from 'src/domain/entities/user/user-entity';

export interface GetOneUserUsecaseInterface {
  execute(userId: string): Promise<User>;
}
