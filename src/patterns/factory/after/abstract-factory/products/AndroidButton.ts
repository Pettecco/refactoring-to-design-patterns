import { Button } from '../interfaces/Button.js';

export class AndroidButton implements Button {
  render(): string {
    return 'android.widget.Button';
  }

  onClick(): void {
    console.log('Android button clicked');
  }
}
