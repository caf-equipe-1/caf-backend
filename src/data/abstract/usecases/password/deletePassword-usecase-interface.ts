import { Password } from 'src/domain/entities/password/password-entity';

export interface DeletePasswordUsecaseInterface {
  execute(passwordId: string): Promise<Password>;
}
