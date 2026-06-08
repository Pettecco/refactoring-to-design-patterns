import { AuthenticationStrategy } from '../interfaces/AuthenticationStrategy';

export class FaceNoteStrategy implements AuthenticationStrategy {
  private static SUCCESS = 200;
  private static REVOKED = 403;
  private static BLOCKED = 408;

  public authenticate(userId: string): number {
    try {
      return this.authenticateViaPost(userId);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
    return 500;
  }

  private authenticateViaPost(userId: string): number {
    const response: Record<string, number> = {
      'paulaS2livros': FaceNoteStrategy.SUCCESS,
      'blockedUser': FaceNoteStrategy.BLOCKED,
      'revokedUser': FaceNoteStrategy.REVOKED
    };
    return response[userId] || 404;
  }

  public getSuccessMessage(): string {
    return 'login successful';
  }

  public getErrorMessage(code: number): string {
    if (code === FaceNoteStrategy.REVOKED) {
      return 'access revoked';
    }
    if (code === FaceNoteStrategy.BLOCKED) {
      return 'access blocked';
    }
    return 'authentication failed';
  }

  public isSuccess(code: number): boolean {
    return code === FaceNoteStrategy.SUCCESS;
  }
}
