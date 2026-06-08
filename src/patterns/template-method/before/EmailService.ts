import { EmailSent, TimeoutException } from './types';

export class EmailService {
  public sendEmail(subject: string, emailBody: string, recipients: string[]): EmailSent {
    if (Math.random() > 0.8) {
      throw new TimeoutException('Timeout while sending email');
    }

    return {
      recipients,
      subject,
      emailsSent: recipients.length
    };
  }
}
