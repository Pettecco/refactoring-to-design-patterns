import { GUIFactory } from './interfaces/GUIFactory.js';
import { Button } from './interfaces/Button.js';
import { Input } from './interfaces/Input.js';
import { Dropdown } from './interfaces/Dropdown.js';

export class Application {
  private factory: GUIFactory;
  private button!: Button;
  private input!: Input;
  private dropdown!: Dropdown;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  initializeUI(): void {
    this.button = this.factory.createButton();
    this.input = this.factory.createInput();
    this.dropdown = this.factory.createDropdown();

    console.log('UI initialized with platform-specific components');
  }

  renderUI(): void {
    console.log('Rendering UI components:');
    console.log(`Button: ${this.button.render()}`);
    console.log(`Input: ${this.input.render()}`);
    console.log(`Dropdown: ${this.dropdown.render()}`);
  }

  interact(): void {
    this.button.onClick();
    console.log(`Input value: ${this.input.getValue()}`);
    this.dropdown.select('Option 1');
  }
}
