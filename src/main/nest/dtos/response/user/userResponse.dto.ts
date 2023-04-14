import { appResponseDtoArray } from '../app/appResponse.dto';
import { cardResponseDtoArray } from '../card/cardResponse.dto';
import { documentResponseDtoArray } from '../document/documentResponse.dto';
import { passwordResponseDtoArray } from '../password/passwordResponse.dto';

export const userResponseDto = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    photo: { type: 'string' },
    cpf: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    passwords: passwordResponseDtoArray,
    documents: documentResponseDtoArray,
    cards: cardResponseDtoArray,
    apps: appResponseDtoArray,
  },
};

export const userResponseDtoArray = {
  type: 'array',
  items: userResponseDto,
};
