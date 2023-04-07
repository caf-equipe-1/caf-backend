import { FaceRegistrationRequestType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationRequest-type';
import { FaceRegistrationResponseType } from 'src/domain/types/adapters/faceRegistration/faceRegistrationResponse-type';
import { FaceRegistrationAdapterInterface } from '../../../abstract/helpers/adapters/auth/faceRegistration-adapter-interface';

//classe para vincular foto selfie com pessoa
//armazena no banco de dados da caf

export class FaceRegistrationAdapter
  implements FaceRegistrationAdapterInterface
{
  public async registrate(
    faceRegistrationRequest: FaceRegistrationRequestType,
  ): Promise<FaceRegistrationResponseType> {
    return Promise.resolve({
      requestId: '2b8f373-c462-4bbf-9a4f-8aeb7d71ec53',
      message: 'Ação realizada com sucesso.',
    });
  }
}
