import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  Request as NestRequest,
  NextFunction,
  Response as NestResponse,
} from 'express';
import { HttpRequest } from 'src/domain/dtos/http/http-request-dto';
import { makeAuthMiddlewareFactory } from 'src/main/factories/middlewares/auth/auth-middleware-factory';
import { Response } from 'src/presentation/helpers/http/response';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: NestRequest, res: NestResponse, next: NextFunction) {
    try {
      const authMiddleware = makeAuthMiddlewareFactory();
      const httpRequest: HttpRequest<any> = {
        authorization: req.headers.authorization,
      };

      const user = await authMiddleware.auth(httpRequest);

      req.body.userId = user;
      next();
    } catch (error) {
      res.status(401).send(Response.unauthorized(error.message));
      return;
    }
  }
}
