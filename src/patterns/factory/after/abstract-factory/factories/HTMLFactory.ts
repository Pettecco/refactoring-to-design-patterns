import { GUIFactory } from '../interfaces/GUIFactory.js';
import { Button } from '../interfaces/Button.js';
import { Input } from '../interfaces/Input.js';
import { Dropdown } from '../interfaces/Dropdown.js';
import { HTMLButton } from '../products/HTMLButton.js';
import { HTMLInput } from '../products/HTMLInput.js';
import { HTMLDropdown } from '../products/HTMLDropdown.js';

export class HTMLFactory implements GUIFactory {
  createButton(): Button {
    return new HTMLButton();
  }

  createInput(): Input {
    return new HTMLInput();
  }

  createDropdown(): Dropdown {
    return new HTMLDropdown();
  }
}
