import axios from 'axios';
import { HttpRequestAdapterInterface } from 'src/data/abstract/helpers/adapters/httpRequest/httpRequest-adapter-interface';

export class HttpRequestAdapter implements HttpRequestAdapterInterface {
  public async post(
    url: string,
    body: any,
    authorizationHeader = '',
  ): Promise<any> {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }

  public async patch(
    url: string,
    body: any,
    authorizationHeader = '',
  ): Promise<any> {
    try {
      const response = await axios.patch(url, body, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }

  public async get(url: string, authorizationHeader = ''): Promise<any> {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }

  public async delete(url: string, authorizationHeader = ''): Promise<any> {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
}
