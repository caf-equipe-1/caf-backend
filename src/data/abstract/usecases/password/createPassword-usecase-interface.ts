import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';

export interface CreatePasswordUsecaseInterface {
  execute(passwordDto: CreateOrUpdatePasswordType): Promise<Password>;
}
