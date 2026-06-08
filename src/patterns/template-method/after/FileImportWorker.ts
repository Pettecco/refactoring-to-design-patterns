import { TemplateWorker } from './TemplateWorker';
import { TimeoutException, ImportResult } from './types';
import { FileService } from './FileService';

export class FileImportWorker extends TemplateWorker {
  private fileService: FileService;

  constructor(fileService: FileService) {
    super();
    this.fileService = fileService;
  }

  protected beforeExecution(params: any): void {
    console.log(`Starting file import: ${params}`);
  }

  protected defaultValue<ImportResult>(): ImportResult {
    return {
      file: '',
      importedRecords: 0,
      success: false
    } as ImportResult;
  }

  protected handleException(e: TimeoutException): void {
    console.error(`Timeout importing file: ${e.message}. Retrying...`);
  }

  protected work<ImportResult>(params: any): ImportResult {
    const fileName = params as string;
    return this.fileService.import(fileName) as ImportResult;
  }
}
