import { describe, it, expect } from '@jest/globals';
import { EmailWorker } from '../before/EmailWorker';
import { EmailService } from '../before/EmailService';
import { SendEmail, EmailType } from '../before/types';

describe('EmailWorker (before Template Method)', () => {
  it('should send email to all recipients', () => {
    const emailService = new EmailService();
    const emailWorker = new EmailWorker(emailService, 3);

    const sendEmail: SendEmail = {
      userId: 1,
      emailType: EmailType.INVITATION,
      recipients: ['email@email.com', 'other@email.com', 'one@email.com'],
    };

    const email = emailWorker.send(sendEmail);

    expect(email.recipients).toEqual(sendEmail.recipients);
    expect(email.subject).toContain('User1');
    expect(email.emailsSent).toBe(3);
  });

  it('should generate correct subject for promotional email', () => {
    const emailService = new EmailService();
    const emailWorker = new EmailWorker(emailService, 3);

    const sendEmail: SendEmail = {
      userId: 2,
      emailType: EmailType.PROMOTIONAL,
      recipients: ['client@email.com'],
    };

    const email = emailWorker.send(sendEmail);

    expect(email.subject).toContain('Special promotion');
  });
});
