export interface GetUserImageUsecaseInterface {
  execute(userId: string): Promise<string>;
}
