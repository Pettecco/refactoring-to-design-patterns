import { Button } from '../interfaces/Button.js';

export class iOSButton implements Button {
  render(): string {
    return 'UIButton';
  }

  onClick(): void {
    console.log('iOS button clicked');
  }
}
