import { Input } from '../interfaces/Input.js';

export class HTMLInput implements Input {
  render(): string {
    return '<input type="text" />';
  }

  getValue(): string {
    return 'HTML input value';
  }
}
