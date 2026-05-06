import { Dropdown } from '../interfaces/Dropdown.js';

export class HTMLDropdown implements Dropdown {
  render(): string {
    return '<select><option>Option 1</option></select>';
  }

  select(option: string): void {
    console.log(`HTML dropdown selected: ${option}`);
  }
}
