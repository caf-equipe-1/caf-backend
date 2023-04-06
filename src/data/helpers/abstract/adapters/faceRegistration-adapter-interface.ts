import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';
import { FaceRegistrationResponseType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationResponse-type';

export interface FaceRegistrationAdapterInterface {
  registrate(
    faceRegistrationRequest: FaceRegistrationRequestType,
  ): Promise<FaceRegistrationResponseType>;
}
