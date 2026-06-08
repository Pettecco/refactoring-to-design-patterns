export interface AuthenticationStrategy {
  authenticate(userId: string): number;
  getSuccessMessage(): string;
  getErrorMessage(code: number): string;
  isSuccess(code: number): boolean;
}
