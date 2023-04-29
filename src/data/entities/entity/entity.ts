import { FileHelperInterface } from 'src/data/abstract/helpers/file/file-helper-interface';

export class Entity {
  private readonly fileHelper: FileHelperInterface;

  public constructor(fileHelper: FileHelperInterface) {
    this.fileHelper = fileHelper;
  }

  protected getDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  protected validateFileType(stringConvertedFile: string): boolean {
    const fileHelper = this.fileHelper;
    fileHelper.setFile(stringConvertedFile);
    const fileData = fileHelper.getFile();

    if (fileData.fileType === null) {
      return false;
    }

    return true;
  }
}
