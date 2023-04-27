export interface GenerateUserImageLinkUsecaseInterface {
  execute(userId: string, image: string): Promise<string>;
}
