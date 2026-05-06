import { Dropdown } from '../interfaces/Dropdown.js';

export class AndroidDropdown implements Dropdown {
  render(): string {
    return 'android.widget.Spinner';
  }

  select(option: string): void {
    console.log(`Android dropdown selected: ${option}`);
  }
}
