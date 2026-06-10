import { describe, it, expect } from '@jest/globals';
import { Car } from '../before/Car.js';

describe('Car (before Builder)', () => {
  it('should validate car with all required fields', () => {
    const car = new Car(
      'Model A',
      'Manufacturer A',
      2000,
      'ABC1234',
      'blue',
      10000,
      2001,
      50000,
      60000
    );

    const isValid = car.validate();
    expect(isValid).toBe(true);
    expect(car.getErrors()).toHaveLength(0);
  });

  it('should fail validation when model year is before manufacturing year', () => {
    const manufacturingYear = 2000;
    const modelYear = 1999;

    const invalidCar = new Car(
      'model a',
      'manufacturer a',
      manufacturingYear,
      'abc1234',
      '',
      0,
      modelYear,
      0,
      0
    );

    const isValid = invalidCar.validate();
    const errors = invalidCar.getErrors();

    expect(isValid).toBe(false);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe(
      'model year cannot be earlier than manufacturing year'
    );
  });

  it('should fail validation when plate is null', () => {
    const invalidCar = new Car(
      'model a',
      'manufacturer a',
      2000,
      '',
      '',
      0,
      2000,
      0,
      0
    );

    const isValid = invalidCar.validate();
    const errors = invalidCar.getErrors();

    expect(isValid).toBe(false);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('plate cannot be null');
  });

  it('should fail validation when model is null', () => {
    const invalidCar = new Car(
      '',
      'manufacturer a',
      2000,
      'ABC1234',
      '',
      0,
      2001,
      0,
      0
    );

    const isValid = invalidCar.validate();
    const errors = invalidCar.getErrors();

    expect(isValid).toBe(false);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('model cannot be null');
  });

  it('should fail validation when manufacturer is null', () => {
    const invalidCar = new Car(
      'model a',
      '',
      2000,
      'ABC1234',
      '',
      0,
      2001,
      0,
      0
    );

    const isValid = invalidCar.validate();
    const errors = invalidCar.getErrors();

    expect(isValid).toBe(false);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('manufacturer cannot be null');
  });
});
