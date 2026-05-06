import { describe, it, expect, jest } from '@jest/globals';
import { Application } from '../after/abstract-factory/Application.js';
import { HTMLFactory } from '../after/abstract-factory/factories/HTMLFactory.js';
import { AndroidFactory } from '../after/abstract-factory/factories/AndroidFactory.js';
import { iOSFactory } from '../after/abstract-factory/factories/iOSFactory.js';

describe('Abstract Factory Pattern', () => {
  it('should create HTML UI components', () => {
    const factory = new HTMLFactory();
    const app = new Application(factory);

    app.initializeUI();

    expect(app).toBeDefined();
  });

  it('should create Android UI components', () => {
    const factory = new AndroidFactory();
    const app = new Application(factory);

    app.initializeUI();

    expect(app).toBeDefined();
  });

  it('should create iOS UI components', () => {
    const factory = new iOSFactory();
    const app = new Application(factory);

    app.initializeUI();

    expect(app).toBeDefined();
  });

  it('should render platform-specific HTML components', () => {
    const factory = new HTMLFactory();
    const app = new Application(factory);
    app.initializeUI();

    const spy = jest.spyOn(console, 'log');
    app.renderUI();

    expect(spy).toHaveBeenCalledWith('Button: <button>HTML Button</button>');
    expect(spy).toHaveBeenCalledWith('Input: <input type="text" />');
    expect(spy).toHaveBeenCalledWith(
      'Dropdown: <select><option>Option 1</option></select>'
    );

    spy.mockRestore();
  });

  it('should render platform-specific Android components', () => {
    const factory = new AndroidFactory();
    const app = new Application(factory);
    app.initializeUI();

    const spy = jest.spyOn(console, 'log');
    app.renderUI();

    expect(spy).toHaveBeenCalledWith('Button: android.widget.Button');
    expect(spy).toHaveBeenCalledWith('Input: android.widget.EditText');
    expect(spy).toHaveBeenCalledWith('Dropdown: android.widget.Spinner');

    spy.mockRestore();
  });

  it('should render platform-specific iOS components', () => {
    const factory = new iOSFactory();
    const app = new Application(factory);
    app.initializeUI();

    const spy = jest.spyOn(console, 'log');
    app.renderUI();

    expect(spy).toHaveBeenCalledWith('Button: UIButton');
    expect(spy).toHaveBeenCalledWith('Input: UITextField');
    expect(spy).toHaveBeenCalledWith('Dropdown: UIPickerView');

    spy.mockRestore();
  });

  it('should interact with platform-specific components', () => {
    const factory = new HTMLFactory();
    const app = new Application(factory);
    app.initializeUI();

    const spy = jest.spyOn(console, 'log');
    app.interact();

    expect(spy).toHaveBeenCalledWith('HTML button clicked');
    expect(spy).toHaveBeenCalledWith('Input value: HTML input value');
    expect(spy).toHaveBeenCalledWith('HTML dropdown selected: Option 1');

    spy.mockRestore();
  });
});
