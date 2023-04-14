import { userResponseDto } from '../user/userResponse.dto';

export const loginResponseDto = {
  properties: {
    token: { type: 'string' },
    user: userResponseDto,
  },
};
