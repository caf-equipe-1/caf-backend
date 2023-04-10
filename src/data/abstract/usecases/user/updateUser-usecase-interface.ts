import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { User } from 'src/domain/entities/user/user-entity';

export interface UpdateUserUsecaseInterface {
  execute(userId: string, userDto: UpdateProfileDto): Promise<User>;
}
