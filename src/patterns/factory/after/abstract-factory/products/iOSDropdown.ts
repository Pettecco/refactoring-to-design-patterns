import { Dropdown } from '../interfaces/Dropdown.js';

export class iOSDropdown implements Dropdown {
  render(): string {
    return 'UIPickerView';
  }

  select(option: string): void {
    console.log(`iOS dropdown selected: ${option}`);
  }
}
