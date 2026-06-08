import { TimeoutException, ImportResult } from './types';

export class FileService {
  public import(fileName: string): ImportResult {
    if (Math.random() > 0.8) {
      throw new TimeoutException('Timeout while importing file');
    }

    return {
      file: fileName,
      importedRecords: 100,
      success: true
    };
  }
}
