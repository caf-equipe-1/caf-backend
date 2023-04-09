import { Password } from 'src/domain/entities/password/password-entity';
import { PasswordType } from 'src/domain/types/entities/password/password-type';

export interface PasswordRepositoryInterface {
  create(userId: string, passwordData: PasswordType): Promise<Password>;
  getOne(passwordId: string): Promise<Password>;
  getAll(userId: string): Promise<Password[]>;
  delete(passwordId: string): Promise<Password>;
  update(passwordId: string, passwordData: PasswordType): Promise<Password>;
}
