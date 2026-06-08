import { EmailWorker } from './after/EmailWorker';
import { FileImportWorker } from './after/FileImportWorker';
import { EmailService } from './after/EmailService';
import { FileService } from './after/FileService';
import { SendEmail, EmailType } from './after/types';

console.log('=== Template Method Pattern - Workers ===\n');

// Email Worker
console.log('--- EmailWorker ---');
const emailService = new EmailService();
const emailWorker = new EmailWorker(emailService);

const sendEmail: SendEmail = {
  userId: 1,
  emailType: EmailType.INVITATION,
  recipients: ['email1@email.com', 'email2@email.com', 'email3@email.com']
};

const emailResult = emailWorker.execute(sendEmail);
console.log(`✓ Emails sent: ${emailResult.emailsSent}`);
console.log(`✓ Subject: ${emailResult.subject}`);
console.log(`✓ Recipients: ${emailResult.recipients.length}`);

// File Import Worker
console.log('\n--- FileImportWorker ---');
const fileService = new FileService();
const fileWorker = new FileImportWorker(fileService);

const importResult = fileWorker.execute('data.csv');
console.log(`✓ File: ${importResult.file}`);
console.log(`✓ Imported records: ${importResult.importedRecords}`);
console.log(`✓ Success: ${importResult.success}`);

console.log('\n=== Template Method allows reusing workflow with specific logic ===');
