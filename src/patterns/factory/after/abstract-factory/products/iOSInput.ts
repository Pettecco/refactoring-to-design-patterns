import { Input } from '../interfaces/Input.js';

export class iOSInput implements Input {
  render(): string {
    return 'UITextField';
  }

  getValue(): string {
    return 'iOS input value';
  }
}
