import { Login } from './after/Login';
import { AuthenticationMethod } from './after/types';
import { FaceNoteStrategy } from './after/strategies/FaceNoteStrategy';
import { ZuiterStrategy } from './after/strategies/ZuiterStrategy';

const strategies = new Map();
strategies.set(AuthenticationMethod.VIA_FACENOTE, new FaceNoteStrategy());
strategies.set(AuthenticationMethod.VIA_ZUITER, new ZuiterStrategy());

const login = new Login(strategies);

console.log('=== EuS2Livros - Social Login ===\n');

const tests = [
  { username: 'paulaS2livros', method: AuthenticationMethod.VIA_FACENOTE },
  { username: 'paulaS2livros', method: AuthenticationMethod.VIA_ZUITER },
  { username: 'revokedUser', method: AuthenticationMethod.VIA_FACENOTE },
  { username: 'blockedUser', method: AuthenticationMethod.VIA_FACENOTE },
  { username: 'pendingUser', method: AuthenticationMethod.VIA_ZUITER },
  { username: 'unknown', method: AuthenticationMethod.VIA_FACENOTE },
];

tests.forEach(({ username, method }) => {
  const response = login.authenticate({ username, method });
  const status = response.status ? '✓' : '✗';
  console.log(`${status} ${method} - ${username}: ${response.message}`);
});
