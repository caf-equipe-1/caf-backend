export type HttpRequest<T> = {
  userId?: string;
  id?: string;
  body?: T;
  authorization?: string;
};
