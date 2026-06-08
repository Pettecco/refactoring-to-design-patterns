export interface User {
  id: number;
  name: string;
  email: string;
}

export enum EmailType {
  INVITATION = 'INVITATION',
  PROMOTIONAL = 'PROMOTIONAL',
  INFORMATIONAL = 'INFORMATIONAL'
}

export interface SendEmail {
  userId: number;
  emailType: EmailType;
  recipients: string[];
}

export interface EmailSent {
  recipients: string[];
  subject: string;
  emailsSent: number;
}

export interface ImportResult {
  file: string;
  importedRecords: number;
  success: boolean;
}

export class TimeoutException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutException';
  }
}
