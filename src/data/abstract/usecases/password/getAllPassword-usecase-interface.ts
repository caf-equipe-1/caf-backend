import { Password } from 'src/domain/entities/password/password-entity';

export interface GetAllPasswordsUsecaseInterface {
  execute(userId: string): Promise<Password[]>;
}
