import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/adapters/tokenHandler/tokenHandler-adapter-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class AuthenticationAdapter {
  private readonly tokenHandler: TokenHandlerAdapterInterface;

  public constructor(tokenHandler: TokenHandlerAdapterInterface) {
    this.tokenHandler = tokenHandler;
  }

  protected generateToken(): string {
    const tokenSecret = EnvVariables.getAuthApiSecret();
    const tokenContent = {
      iss: EnvVariables.getAuthApiUserId(),
    };

    const token = this.tokenHandler.generateToken(tokenContent, tokenSecret);

    return token;
  }
}
