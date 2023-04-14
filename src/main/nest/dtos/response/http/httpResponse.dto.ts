import { appResponseDto, appResponseDtoArray } from '../app/appResponse.dto';
import {
  cardResponseDto,
  cardResponseDtoArray,
} from '../card/cardResponse.dto';
import {
  documentResponseDto,
  documentResponseDtoArray,
} from '../document/documentResponse.dto';
import { loginResponseDto } from '../login/loginResponse.dto';
import {
  passwordResponseDto,
  passwordResponseDtoArray,
} from '../password/passwordResponse.dto';
import {
  userResponseDto,
  userResponseDtoArray,
} from '../user/userResponse.dto';

export function makeHttpResponseDto(parameter = '', array = false): any {
  let body: any = { type: 'object' };

  const app = parameter.toLowerCase() === 'app' && array === false;
  const appArray = parameter.toLowerCase() === 'app' && array === true;

  const card = parameter.toLowerCase() === 'card' && array === false;
  const cardArray = parameter.toLowerCase() === 'card' && array === true;

  const document = parameter.toLowerCase() === 'document' && array === false;
  const documentArray =
    parameter.toLowerCase() === 'document' && array === true;

  const password = parameter.toLowerCase() === 'password' && array === false;
  const passwordArray =
    parameter.toLowerCase() === 'password' && array === true;

  const user = parameter.toLowerCase() === 'user' && array === false;
  const userArray = parameter.toLowerCase() === 'user' && array === true;

  const login = parameter.toLowerCase() === 'login' && array === false;

  switch (true) {
    case app:
      body = appResponseDto;
      break;

    case appArray:
      body = appResponseDtoArray;
      break;

    case card:
      body = cardResponseDto;
      break;

    case cardArray:
      body = cardResponseDtoArray;
      break;

    case document:
      body = documentResponseDto;
      break;

    case documentArray:
      body = documentResponseDtoArray;
      break;

    case password:
      body = passwordResponseDto;
      break;

    case passwordArray:
      body = passwordResponseDtoArray;
      break;

    case user:
      body = userResponseDto;
      break;

    case userArray:
      body = userResponseDtoArray;
      break;

    case login:
      body = loginResponseDto;
      break;

    default:
      break;
  }

  return {
    properties: {
      statusCode: { type: 'number' },
      message: { type: 'string' },
      error: { type: 'boolean' },
      body: body,
    },
  };
}
