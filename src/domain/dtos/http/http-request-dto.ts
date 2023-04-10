export type HttpRequest<T> = {
  id: string;
  body: T;
  authorization: string;
};
