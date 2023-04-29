import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';
import { FaceRegistrationResponseType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationResponse-type';
import { FaceRegistrationAdapterInterface } from '../../../abstract/helpers/adapters/auth/faceRegistration-adapter-interface';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/adapters/tokenHandler/tokenHandler-adapter-interface';
import { HttpRequestAdapterInterface } from 'src/data/abstract/helpers/adapters/httpRequest/httpRequest-adapter-interface';
import { AuthenticationAdapter } from './authentication-adapter';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class FaceRegistrationAdapter
  extends AuthenticationAdapter
  implements FaceRegistrationAdapterInterface
{
  private readonly httpRequestAdapter: HttpRequestAdapterInterface;

  public constructor(
    tokenHandler: TokenHandlerAdapterInterface,
    httpRequestAdapter: HttpRequestAdapterInterface,
  ) {
    super(tokenHandler);
    this.httpRequestAdapter = httpRequestAdapter;
  }

  public async registrate(
    faceRegistrationRequest: FaceRegistrationRequestType,
  ): Promise<FaceRegistrationResponseType> {
    const token = this.generateToken();
    const apiUrl = EnvVariables.getAuthApiUrl();

    const registration = await this.httpRequestAdapter.post(
      `${apiUrl}/register`,
      faceRegistrationRequest,
      token,
    );

    return registration;
  }
}
