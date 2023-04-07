import { FaceAuthenticationRequestType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationRequest-type';
import { FaceAuthenticationResponseType } from 'src/domain/types/adapters/faceAuthentication/faceAuthenticationResponse-type';
import { FaceAuthenticationAdapterInterface } from '../../../abstract/helpers/adapters/auth/faceAuthentication-adapter-interface';

//classe para realizar a autenticacao de um usuario por imagem

export class FaceAuthenticationAdapter
  implements FaceAuthenticationAdapterInterface
{
  public async authenticate(
    faceAuthenticationRequest: FaceAuthenticationRequestType,
  ): Promise<FaceAuthenticationResponseType> {
    return Promise.resolve({
      requestId: '2b8f373-c462-4bbf-9a4f-8aeb7d71ec53',
      isMatch: true,
    });
  }
}
