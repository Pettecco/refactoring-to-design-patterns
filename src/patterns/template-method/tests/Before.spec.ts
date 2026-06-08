import { FileImportWorker } from '../before/FileImportWorker';
import { FileService } from '../before/FileService';

describe('FileImportWorker (before)', () => {
  it('should import file with correct data', () => {
    const fileService = new FileService();
    const worker = new FileImportWorker(fileService);

    const result = worker.import('data.csv');

    expect(result.importedRecords).toBe(100);
    expect(result.file).toBe('data.csv');
    expect(result.success).toBe(true);
  });
});
