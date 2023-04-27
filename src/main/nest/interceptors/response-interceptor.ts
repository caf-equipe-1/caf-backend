import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data && data.statusCode) {
          throw new HttpException(data, data.statusCode);
        }
      }),
    );
  }
}
