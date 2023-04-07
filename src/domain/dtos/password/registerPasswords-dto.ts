import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';

export type RegisterPasswordDto = {
  passwords: CreateOrUpdatePasswordType[];
};
