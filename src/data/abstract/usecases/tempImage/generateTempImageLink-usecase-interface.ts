export interface GenerateTempImageLinkUsecaseInterface {
  execute(image: string): Promise<string>;
}
