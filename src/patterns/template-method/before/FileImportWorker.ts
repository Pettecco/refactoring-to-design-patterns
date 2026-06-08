import { TimeoutException, ImportResult } from './types';
import { FileService } from './FileService';

export class FileImportWorker {
  private retryLimit: number;
  private fileService: FileService;
  private retryCount: number = 0;

  constructor(fileService: FileService, retryLimit: number = 3) {
    this.fileService = fileService;
    this.retryLimit = retryLimit;
  }

  public import(fileName: string): ImportResult {
    let result: ImportResult = {
      file: '',
      importedRecords: 0,
      success: false
    };

    this.retryCount = 0;

    while (this.retryCount < this.retryLimit) {
      try {
        result = this.fileService.import(fileName);
        this.retryCount = this.retryLimit;
      } catch (e) {
        if (e instanceof TimeoutException || e instanceof Error) {
          console.error(`Error importing file: ${e.message}`);
          this.retryCount++;
        } else {
          throw e;
        }
      }
    }

    return result;
  }
}
