import { PhotoAuthenticationRequestType } from 'src/domain/types/adapters/photoAuthentication/photoAuthenticationRequest-type';
import { PhotoAuthenticationResponseType } from 'src/domain/types/adapters/photoAuthentication/photoAuthenticationResponse-type';
import { PhotoAuthenticationAdapterInterface } from '../abstract/adapters/photoAuthentication-adapter-interface';

//classe para enviar requisicao para validar se foto e autentica

export class PhotoAuthenticationAdapter
  implements PhotoAuthenticationAdapterInterface
{
  public async authenticate(
    photoAuthenticationRequest: PhotoAuthenticationRequestType,
  ): Promise<PhotoAuthenticationResponseType> {
    return Promise.resolve({
      requestId: '2b8f373-c462-4bbf-9a4f-8aeb7d71ec53',
      isAlive: true,
      attemptId: '6021a21b3811c35ecb8dea20',
      person: {
        cpf: '00011122233',
        name: 'John Doe',
      },
      message: null,
    });
  }
}
