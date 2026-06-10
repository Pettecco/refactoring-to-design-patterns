import { AuthenticationStrategy } from '../interfaces/AuthenticationStrategy.js';

export class ZuiterStrategy implements AuthenticationStrategy {
  private static SUCCESS = 202;
  private static PENDING = 400;

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
      paulaS2livros: ZuiterStrategy.SUCCESS,
      pendingUser: ZuiterStrategy.PENDING,
    };
    return response[userId] || 404;
  }

  public getSuccessMessage(): string {
    return 'login successful';
  }

  public getErrorMessage(code: number): string {
    if (code === ZuiterStrategy.PENDING) {
      return 'access pending';
    }
    return 'authentication failed';
  }

  public isSuccess(code: number): boolean {
    return code === ZuiterStrategy.SUCCESS;
  }
}
