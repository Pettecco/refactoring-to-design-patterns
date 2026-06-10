import { describe, it, expect } from '@jest/globals';
import { Login } from '../before/Login';
import { AuthenticationMethod } from '../before/types';

class FaceNoteLoginServiceFake {
  public authenticate(userId: string): number {
    if (userId === 'Gil') {
      return 200;
    }
    if (userId === 'Ana') {
      return 403;
    }
    return 404;
  }
}

class ZuiterLoginServiceFake {
  public authenticate(userId: string): number {
    if (userId === 'Gil') {
      return 202;
    }
    return 404;
  }
}

describe('Login (before Strategy)', () => {
  it('should authenticate successfully via FaceNote', () => {
    const login = new Login();
    (login as any).faceNoteService = new FaceNoteLoginServiceFake();
    (login as any).zuiterService = new ZuiterLoginServiceFake();

    const data = {
      username: 'Gil',
      method: AuthenticationMethod.VIA_FACENOTE,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(true);
    expect(response.message).toBe('login successful');
  });

  it('should fail with revoked access via FaceNote', () => {
    const login = new Login();
    (login as any).faceNoteService = new FaceNoteLoginServiceFake();
    (login as any).zuiterService = new ZuiterLoginServiceFake();

    const data = {
      username: 'Ana',
      method: AuthenticationMethod.VIA_FACENOTE,
    };

    const response = login.authenticate(data);

    expect(response.status).toBe(false);
    expect(response.message).toBe('access revoked');
  });
});
