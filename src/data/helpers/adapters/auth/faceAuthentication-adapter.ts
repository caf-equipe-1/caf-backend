import { FaceAuthenticationResponseType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationResponse-type';
import { FaceAuthenticationAdapterInterface } from '../../../abstract/helpers/adapters/auth/faceAuthentication-adapter-interface';
import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/tokenHandler/tokenHandler-adapter-interface';
import { HttpRequestAdapterInterface } from 'src/data/abstract/helpers/adapters/httpRequest/httpRequest-adapter-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';
import { AuthenticationAdapter } from './authentication-adapter';

export class FaceAuthenticationAdapter
  extends AuthenticationAdapter
  implements FaceAuthenticationAdapterInterface
{
  private readonly httpRequestAdapter: HttpRequestAdapterInterface;

  public constructor(
    tokenHandler: TokenHandlerAdapterInterface,
    httpRequestAdapter: HttpRequestAdapterInterface,
  ) {
    super(tokenHandler);
    this.httpRequestAdapter = httpRequestAdapter;
  }

  public async authenticate(
    faceAuthenticationRequest: FaceRegistrationRequestType,
  ): Promise<FaceAuthenticationResponseType> {
    const token = this.generateToken();
    const apiUrl = EnvVariables.getAuthApiUrl();

    const authentication = await this.httpRequestAdapter.post(
      `${apiUrl}/authenticate`,
      faceAuthenticationRequest,
      token,
    );

    return authentication;
  }
}
