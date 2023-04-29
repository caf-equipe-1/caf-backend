import { FileHelperInterface } from 'src/data/abstract/helpers/file/file-helper-interface';
import { FileDataType } from 'src/domain/types/file/fileData-type';

export class FileHelper implements FileHelperInterface {
  private file: string;

  public setFile(stringConvertedFile: string): void {
    this.file = stringConvertedFile;
  }

  public getFile(): FileDataType {
    return {
      file: this.trimFileType(),
      fileType: this.getFileType(),
    };
  }

  private trimFileType(): string {
    return this.file.replace(/^data:[a-z]+\/\w+;base64,/i, '');
  }

  private getFileType(): string | null {
    const fileTypes = [
      {
        stringMatch: 'text/plain',
        fileType: 'txt',
      },
      {
        stringMatch: 'image/jpeg',
        fileType: 'jpeg',
      },
      {
        stringMatch: 'image/png',
        fileType: 'png',
      },
      {
        stringMatch: 'application/pdf',
        fileType: 'pdf',
      },
      {
        stringMatch:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileType: 'docx',
      },
      {
        stringMatch: 'application/vnd.ms-word.document.macroEnabled.12',
        fileType: 'docm',
      },
      {
        stringMatch:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileType: 'xlsx',
      },
      {
        stringMatch: 'application/vnd.ms-excel.sheet.macroEnabled.12',
        fileType: 'xlsm',
      },
      {
        stringMatch:
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        fileType: 'pptx',
      },
      {
        stringMatch:
          'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        fileType: 'pptm',
      },
    ];

    for (const type of fileTypes) {
      const matchType = this.file.includes(type.stringMatch);

      if (matchType) {
        return type.fileType;
      }
    }

    return null;
  }
}
