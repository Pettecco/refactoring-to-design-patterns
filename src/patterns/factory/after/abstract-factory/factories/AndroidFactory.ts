import { GUIFactory } from '../interfaces/GUIFactory.js';
import { Button } from '../interfaces/Button.js';
import { Input } from '../interfaces/Input.js';
import { Dropdown } from '../interfaces/Dropdown.js';
import { AndroidButton } from '../products/AndroidButton.js';
import { AndroidInput } from '../products/AndroidInput.js';
import { AndroidDropdown } from '../products/AndroidDropdown.js';

export class AndroidFactory implements GUIFactory {
  createButton(): Button {
    return new AndroidButton();
  }

  createInput(): Input {
    return new AndroidInput();
  }

  createDropdown(): Dropdown {
    return new AndroidDropdown();
  }
}
