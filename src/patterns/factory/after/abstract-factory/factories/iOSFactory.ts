import { GUIFactory } from '../interfaces/GUIFactory.js';
import { Button } from '../interfaces/Button.js';
import { Input } from '../interfaces/Input.js';
import { Dropdown } from '../interfaces/Dropdown.js';
import { iOSButton } from '../products/iOSButton.js';
import { iOSInput } from '../products/iOSInput.js';
import { iOSDropdown } from '../products/iOSDropdown.js';

export class iOSFactory implements GUIFactory {
  createButton(): Button {
    return new iOSButton();
  }

  createInput(): Input {
    return new iOSInput();
  }

  createDropdown(): Dropdown {
    return new iOSDropdown();
  }
}
