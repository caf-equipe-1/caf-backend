export interface HttpRequestAdapterInterface {
  post(url: string, body: any, authorizationHeader?: string): Promise<any>;
  patch(url: string, body: any, authorizationHeader?: string): Promise<any>;
  get(url: string, authorizationHeader?: string): Promise<any>;
  delete(url: string, authorizationHeader?: string): Promise<any>;
}
