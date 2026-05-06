import { Input } from '../interfaces/Input.js';

export class AndroidInput implements Input {
  render(): string {
    return 'android.widget.EditText';
  }

  getValue(): string {
    return 'Android input value';
  }
}
