import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';

export interface FaceRegistrationAdapterInterface {
  registrate(
    faceRegistrationRequest: FaceRegistrationRequestType,
  ): Promise<boolean>;
}
