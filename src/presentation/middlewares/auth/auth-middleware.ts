import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/tokenHandler/tokenHandler-adapter-interface';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { UnauthorizedError } from 'src/utils/errors/unauthorized-error';
import { AuthMiddlewareInterface } from '../../abstract/middleware/auth-middleware-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class AuthMiddleware implements AuthMiddlewareInterface {
  private readonly tokenHandler: TokenHandlerAdapterInterface;

  public constructor(tokenHandler: TokenHandlerAdapterInterface) {
    this.tokenHandler = tokenHandler;
  }

  public async auth(httpRequest: HttpRequest<any>): Promise<string> {
    try {
      const authorization = httpRequest.authorization;

      if (!authorization) {
        throw new UnauthorizedError('Invalid Token');
      }

      const split = authorization.split(' ');

      if (!split || split[0] !== 'Bearer' || split.length !== 2) {
        throw new UnauthorizedError('Invalid Token');
      }

      const secret = EnvVariables.getSecret();
      const user = await this.tokenHandler.validateToken(split[1], secret);

      return user.id;
    } catch (error) {
      throw new UnauthorizedError('Invalid Token');
    }
  }
}
