import { UserType } from 'src/domain/types/entities/user/user-type';
import { User } from 'src/domain/entities/user/user-entity';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';

export interface UserEntityInterface {
  setData(userDto: CreateProfileDto | UpdateProfileDto): void;
  validate(): void;
  getBody(): UserType;
  updateData(mainData: User): UserType;
  validateUpdate(): void;
}
