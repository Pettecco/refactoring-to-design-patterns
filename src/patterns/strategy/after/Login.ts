import { AuthenticationStrategy } from './interfaces/AuthenticationStrategy';
import { LoginData, LoginResponse } from './types';

export class Login {
  private static INVALID_METHOD = -1;

  constructor(
    private strategies: Map<string, AuthenticationStrategy>
  ) {}

  public authenticate(loginData: LoginData): LoginResponse {
    const strategy = this.strategies.get(loginData.method);

    if (!strategy) {
      return {
        status: false,
        message: 'invalid authentication method'
      };
    }

    const responseCode = strategy.authenticate(loginData.username);

    if (strategy.isSuccess(responseCode)) {
      return {
        status: true,
        message: strategy.getSuccessMessage()
      };
    }

    return {
      status: false,
      message: strategy.getErrorMessage(responseCode)
    };
  }
}
