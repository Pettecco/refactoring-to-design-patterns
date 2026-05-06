import { Button } from '../interfaces/Button.js';

export class HTMLButton implements Button {
  render(): string {
    return '<button>HTML Button</button>';
  }

  onClick(): void {
    console.log('HTML button clicked');
  }
}
