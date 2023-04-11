import { User } from 'src/domain/entities/user/user-entity';
import { UserType } from 'src/domain/types/entities/user/user-type';

export interface UserRepositoryInterface {
  create(userData: UserType): Promise<User>;
  getOneById(userId: string): Promise<User>;
  getOneByEmail(userEmail: string): Promise<User>;
  getOneByCpf(userCnpj: string): Promise<User>;
  getAll(): Promise<User[]>;
  delete(userId: string): Promise<User>;
  update(userId: string, userData: UserType): Promise<User>;
}
