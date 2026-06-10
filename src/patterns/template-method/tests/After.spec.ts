import { describe, it, expect } from '@jest/globals';
import { EmailWorker } from '../after/EmailWorker';
import { FileImportWorker } from '../after/FileImportWorker';
import { EmailService } from '../after/EmailService';
import { FileService } from '../after/FileService';
import { SendEmail, EmailType } from '../after/types';

describe('Template Method (after)', () => {
  it('should send email to all recipients', () => {
    const emailService = new EmailService();
    const emailWorker = new EmailWorker(emailService);

    const sendEmail: SendEmail = {
      userId: 1,
      emailType: EmailType.INVITATION,
      recipients: ['email@email.com', 'other@email.com', 'one@email.com'],
    };

    const email = emailWorker.execute(sendEmail);

    expect(email.recipients).toEqual(sendEmail.recipients);
    expect(email.subject).toContain('User1');
    expect(email.emailsSent).toBe(3);
  });

  it('should import file correctly', () => {
    const fileService = new FileService();
    const fileWorker = new FileImportWorker(fileService);

    const result = fileWorker.execute('data.csv');

    expect(result.importedRecords).toBe(100);
    expect(result.file).toBe('data.csv');
    expect(result.success).toBe(true);
  });

  it('should execute both workers successfully', () => {
    const emailService = new EmailService();
    const emailWorker = new EmailWorker(emailService);
    const fileService = new FileService();
    const fileWorker = new FileImportWorker(fileService);

    const emailResult = emailWorker.execute({
      userId: 1,
      emailType: EmailType.INVITATION,
      recipients: ['test@email.com'],
    });
    const fileResult = fileWorker.execute('test.csv');

    expect(emailResult.emailsSent).toBe(1);
    expect(fileResult.file).toBe('test.csv');
  });
});
