import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { PasswordType } from 'src/domain/types/entities/password/password-type';

export interface PasswordEntityInterface {
  setData(passwordDto: CreateOrUpdatePasswordType): void;
  validate(): void;
  getBody(): PasswordType;
  updateData(mainData: Password): PasswordType;
  validateUpdate(): void;
}
