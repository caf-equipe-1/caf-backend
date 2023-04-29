import { FileDataType } from 'src/domain/types/file/fileData-type';

export interface FileHelperInterface {
  setFile(stringConvertedFile: string): void;
  getFile(): FileDataType;
}
