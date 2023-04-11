import { HttpResponse } from 'src/domain/dtos/http/http-response-dto';

export class Response {
  public static ok(body: any): HttpResponse<any> {
    return {
      error: false,
      statusCode: 200,
      message: 'Ok',
      body,
    };
  }

  public static created(body: any): HttpResponse<any> {
    return {
      error: false,
      statusCode: 201,
      message: 'Created',
      body,
    };
  }

  public static badRequest(message: string): HttpResponse<any> {
    return {
      error: true,
      statusCode: 400,
      message,
      body: {},
    };
  }

  public static unauthorized(message: string): HttpResponse<any> {
    return {
      error: true,
      statusCode: 401,
      message,
      body: {},
    };
  }

  public static notFound(message: string): HttpResponse<any> {
    return {
      error: true,
      statusCode: 404,
      message,
      body: {},
    };
  }
}
