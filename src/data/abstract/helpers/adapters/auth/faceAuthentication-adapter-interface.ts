import { FaceAuthenticationResponseType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationResponse-type';
import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';

export interface FaceAuthenticationAdapterInterface {
  authenticate(
    faceAuthenticationRequest: FaceRegistrationRequestType,
  ): Promise<FaceAuthenticationResponseType>;
}
