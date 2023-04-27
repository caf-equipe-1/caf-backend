import * as jwt from 'jsonwebtoken';
import { TokenHandlerAdapterInterface } from 'src/data/abstract/helpers/tokenHandler/tokenHandler-adapter-interface';
import { GetOneUserUsecase } from 'src/data/usecases/user/getOneUser-usecase';
import { User } from 'src/domain/entities/user/user-entity';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class TokenHandlerAdapter implements TokenHandlerAdapterInterface {
  public constructor(private readonly getOneUserUsecase: GetOneUserUsecase) {}

  public generateToken(content: any, secret: string): string {
    return jwt.sign(content, secret, {
      expiresIn: 86400,
    });
  }

  public async validateToken(token: string, secret: string): Promise<User> {
    let mainUser: User;
    await jwt.verify(token, secret, async (error, decoded: User) => {
      try {
        if (error) {
          throw new InvalidParamError('Token');
        }

        const userId = decoded.id;

        const user = await this.getOneUserUsecase.execute(userId);

        if (!user || !user.id) {
          throw new InvalidParamError('token');
        }

        mainUser = user;
        return;
      } catch (error) {
        throw new InvalidParamError('token');
      }
    });
    return mainUser;
  }
}
