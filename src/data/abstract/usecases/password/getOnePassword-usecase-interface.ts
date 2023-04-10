import { Password } from 'src/domain/entities/password/password-entity';

export interface GetOnePasswordUsecaseInterface {
  execute(passwordId: string): Promise<Password>;
}
