import { FaceAuthenticationRequestType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationRequest-type';
import { FaceAuthenticationResponseType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationResponse-type';

export interface FaceAuthenticationAdapterInterface {
  authenticate(
    faceAuthenticationRequest: FaceAuthenticationRequestType,
  ): Promise<FaceAuthenticationResponseType>;
}
