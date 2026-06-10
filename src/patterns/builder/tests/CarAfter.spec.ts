import { describe, it, expect } from '@jest/globals';
import { ValidCarBuilder } from '../after/ValidCarBuilder.js';

describe('ValidCarBuilder', () => {
  it('should create a valid car with default values', () => {
    const builder = new ValidCarBuilder();
    const validCar = builder.build();

    const isValid = validCar.validate();
    expect(isValid).toBe(true);
  });

  it('should create a car with custom color and mileage', () => {
    const builder = new ValidCarBuilder()
      .withColor('blue')
      .withMileage(1234);

    const validCar = builder.build();

    const isValid = validCar.validate();
    expect(isValid).toBe(true);
    expect(validCar.getColor()).toBe('blue');
    expect(validCar.getMileage()).toBe(1234);
  });

  it('should create a car with custom prices', () => {
    const builder = new ValidCarBuilder()
      .withMinPrice(50000)
      .withAdvertisedPrice(60000);

    const validCar = builder.build();

    expect(validCar.getMinPrice()).toBe(50000);
    expect(validCar.getAdvertisedPrice()).toBe(60000);
  });

  it('should create a car with all custom values', () => {
    const builder = new ValidCarBuilder()
      .withModel('Civic')
      .withManufacturer('Honda')
      .withManufacturingYear(2020)
      .withPlate('XYZ9876')
      .withColor('silver')
      .withMileage(15000)
      .withModelYear(2021)
      .withMinPrice(80000)
      .withAdvertisedPrice(90000);

    const validCar = builder.build();

    const isValid = validCar.validate();
    expect(isValid).toBe(true);
    expect(validCar.getModel()).toBe('Civic');
    expect(validCar.getManufacturer()).toBe('Honda');
    expect(validCar.getManufacturingYear()).toBe(2020);
    expect(validCar.getPlate()).toBe('XYZ9876');
    expect(validCar.getColor()).toBe('silver');
    expect(validCar.getMileage()).toBe(15000);
    expect(validCar.getModelYear()).toBe(2021);
  });

  it('should allow method chaining in any order', () => {
    const builder = new ValidCarBuilder()
      .withMileage(5000)
      .withColor('red')
      .withMinPrice(40000);

    const validCar = builder.build();

    expect(validCar.getMileage()).toBe(5000);
    expect(validCar.getColor()).toBe('red');
    expect(validCar.getMinPrice()).toBe(40000);
  });

  it('should create invalid car when model year is before manufacturing year', () => {
    const builder = new ValidCarBuilder()
      .withManufacturingYear(2020)
      .withModelYear(2019);

    const invalidCar = builder.build();

    const isValid = invalidCar.validate();
    expect(isValid).toBe(false);
    expect(invalidCar.getErrors()).toHaveLength(1);
    expect(invalidCar.getErrors()[0]).toBe(
      'model year cannot be earlier than manufacturing year'
    );
  });
});

describe('Car (after Builder)', () => {
  it('should validate car created with builder', () => {
    const builder = new ValidCarBuilder();
    const car = builder.build();

    const isValid = car.validate();
    expect(isValid).toBe(true);
  });
});
