import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';

export interface UpdatePasswordUsecaseInterface {
  execute(
    passwordId: string,
    passwordDto: CreateOrUpdatePasswordType,
  ): Promise<Password>;
}
