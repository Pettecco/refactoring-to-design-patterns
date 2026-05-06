import { Button } from './Button.js';
import { Dropdown } from './Dropdown.js';
import { Input } from './Input.js';

export interface GUIFactory {
  createButton(): Button;
  createInput(): Input;
  createDropdown(): Dropdown;
}
