import { CreateProfileDto } from 'src/domain/dtos/registration/createProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';

export interface CreateUserUsecaseInterface {
  execute(userDto: CreateProfileDto): Promise<User>;
}
