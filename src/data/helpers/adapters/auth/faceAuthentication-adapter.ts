import { FaceAuthenticationResponseType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationResponse-type';
import { FaceAuthenticationAdapterInterface } from '../../../abstract/helpers/adapters/auth/faceAuthentication-adapter-interface';
import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';

export class FaceAuthenticationAdapter
  implements FaceAuthenticationAdapterInterface
{
  public async authenticate(
    faceAuthenticationRequest: FaceRegistrationRequestType,
  ): Promise<FaceAuthenticationResponseType> {
    return Promise.resolve({
      requestId: '2b8f373-c462-4bbf-9a4f-8aeb7d71ec53',
      isMatch: true,
    });
  }
}
