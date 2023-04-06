import { PhotoAuthenticationRequestType } from 'src/domain/types/adapters/photoAuthentication/photoAuthenticationRequest-type';
import { PhotoAuthenticationResponseType } from 'src/domain/types/adapters/photoAuthentication/photoAuthenticationResponse-type';

export interface PhotoAuthenticationAdapterInterface {
  authenticate(
    photoAuthenticationRequest: PhotoAuthenticationRequestType,
  ): Promise<PhotoAuthenticationResponseType>;
}
