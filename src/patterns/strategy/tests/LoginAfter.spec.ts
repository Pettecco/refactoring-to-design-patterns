import { describe, it, expect } from '@jest/globals';
import { Login } from '../after/Login';
import { AuthenticationMethod } from '../after/types';
import { AuthenticationStrategy } from '../after/interfaces/AuthenticationStrategy';

class FaceNoteStrategyFake implements AuthenticationStrategy {
  public authenticate(userId: string): number {
    if (userId === 'Gil') {
      return 200;
    }
    if (userId === 'Ana') {
      return 403;
    }
    return 404;
  }

  public getSuccessMessage(): string {
    return 'login successful';
  }

  public getErrorMessage(code: number): string {
    if (code === 403) {
      return 'access revoked';
    }
    return 'authentication failed';
  }

  public isSuccess(code: number): boolean {
    return code === 200;
  }
}

class ZuiterStrategyFake implements AuthenticationStrategy {
  public authenticate(userId: string): number {
    if (userId === 'Gil') {
      return 202;
    }
    return 404;
  }

  public getSuccessMessage(): string {
    return 'login successful';
  }

  public getErrorMessage(code: number): string {
    return 'authentication failed';
  }

  public isSuccess(code: number): boolean {
    return code === 202;
  }
}

describe('Login (after Strategy)', () => {
  it('should authenticate successfully via FaceNote', () => {
    const strategies = new Map<string, AuthenticationStrategy>();
    strategies.set(
      AuthenticationMethod.VIA_FACENOTE,
      new FaceNoteStrategyFake()
    );
    strategies.set(AuthenticationMethod.VIA_ZUITER, new ZuiterStrategyFake());

    const login = new Login(strategies);

    const data = {
      username: 'Gil',
      method: AuthenticationMethod.VIA_FACENOTE,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(true);
    expect(response.message).toBe('login successful');
  });

  it('should fail with revoked access via FaceNote', () => {
    const strategies = new Map<string, AuthenticationStrategy>();
    strategies.set(
      AuthenticationMethod.VIA_FACENOTE,
      new FaceNoteStrategyFake()
    );
    strategies.set(AuthenticationMethod.VIA_ZUITER, new ZuiterStrategyFake());

    const login = new Login(strategies);

    const data = {
      username: 'Ana',
      method: AuthenticationMethod.VIA_FACENOTE,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(false);
    expect(response.message).toBe('access revoked');
  });

  it('should authenticate successfully via Zuiter', () => {
    const strategies = new Map<string, AuthenticationStrategy>();
    strategies.set(
      AuthenticationMethod.VIA_FACENOTE,
      new FaceNoteStrategyFake()
    );
    strategies.set(AuthenticationMethod.VIA_ZUITER, new ZuiterStrategyFake());

    const login = new Login(strategies);

    const data = {
      username: 'Gil',
      method: AuthenticationMethod.VIA_ZUITER,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(true);
    expect(response.message).toBe('login successful');
  });

  it('should return error for invalid method', () => {
    const strategies = new Map<string, AuthenticationStrategy>();
    strategies.set(
      AuthenticationMethod.VIA_FACENOTE,
      new FaceNoteStrategyFake()
    );

    const login = new Login(strategies);

    const data = {
      username: 'Gil',
      method: 'VIA_INSTAGRAM' as any,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(false);
    expect(response.message).toBe('invalid authentication method');
  });
});
