import { TemplateWorker } from './TemplateWorker';
import { User, SendEmail, EmailSent, EmailType, TimeoutException } from './types';
import { EmailService } from './EmailService';

export class EmailWorker extends TemplateWorker {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    super();
    this.emailService = emailService;
  }

  protected beforeExecution(params: any): void {
    console.log('Starting email sending...');
  }

  protected defaultValue<EmailSent>(): EmailSent {
    return {
      recipients: [],
      subject: '',
      emailsSent: 0
    } as EmailSent;
  }

  protected handleException(e: TimeoutException): void {
    console.error(`Timeout sending email: ${e.message}. Retrying...`);
  }

  protected work<EmailSent>(params: any): EmailSent {
    const sendEmail = params as SendEmail;

    const user = this.findUser(sendEmail.userId);
    const emailBody = this.generateEmailBody(sendEmail.emailType, user);
    const subject = this.generateSubject(sendEmail.emailType, user);

    return this.emailService.sendEmail(
      subject,
      emailBody,
      sendEmail.recipients
    ) as EmailSent;
  }

  private findUser(userId: number): User {
    const users: Record<number, User> = {
      1: { id: 1, name: 'User1', email: 'user1@email.com' },
      2: { id: 2, name: 'User2', email: 'user2@email.com' }
    };
    return users[userId] || { id: 0, name: 'Unknown', email: '' };
  }

  private generateEmailBody(emailType: EmailType, user: User): string {
    const bodies: Record<EmailType, string> = {
      [EmailType.INVITATION]: `Hello ${user.name}, you have been invited!`,
      [EmailType.PROMOTIONAL]: `Hello ${user.name}, check out our promotion!`,
      [EmailType.INFORMATIONAL]: `Hello ${user.name}, here is your information.`
    };
    return bodies[emailType] || 'Email without content';
  }

  private generateSubject(emailType: EmailType, user: User): string {
    const subjects: Record<EmailType, string> = {
      [EmailType.INVITATION]: `Invitation sent by ${user.name}`,
      [EmailType.PROMOTIONAL]: `Special promotion for ${user.name}`,
      [EmailType.INFORMATIONAL]: `Important information for ${user.name}`
    };
    return subjects[emailType] || 'Unknown subject';
  }
}
