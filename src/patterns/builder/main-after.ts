import { ValidCarBuilder } from './after/ValidCarBuilder.js';

console.log('=== Builder Pattern - After ===\n');

// Criar um carro válido com valores padrão
const builder1 = new ValidCarBuilder();
const car1 = builder1.build();

console.log('Car 1 (default values) valid?', car1.validate());
console.log('Model:', car1.getModel());
console.log('Plate:', car1.getPlate());

// Criar um carro com cor e quilometragem personalizadas
const builder2 = new ValidCarBuilder()
  .withColor('blue')
  .withMileage(1234);

const car2 = builder2.build();
console.log('\nCar 2 (custom color and mileage) valid?', car2.validate());
console.log('Color:', car2.getColor());
console.log('Mileage:', car2.getMileage());

// Criar um carro com todos os campos personalizados
const builder3 = new ValidCarBuilder()
  .withModel('Civic')
  .withManufacturer('Honda')
  .withManufacturingYear(2020)
  .withPlate('XYZ9876')
  .withColor('silver')
  .withMileage(15000)
  .withModelYear(2021)
  .withMinPrice(80000)
  .withAdvertisedPrice(90000);

const car3 = builder3.build();
console.log('\nCar 3 (all custom fields) valid?', car3.validate());
console.log('Model:', car3.getModel());
console.log('Advertised price:', car3.getAdvertisedPrice());

// Criar um carro inválido (ano do modelo anterior)
const builder4 = new ValidCarBuilder()
  .withManufacturingYear(2020)
  .withModelYear(2019);

const car4 = builder4.build();
console.log('\nCar 4 (invalid year) valid?', car4.validate());
console.log('Errors:', car4.getErrors());

console.log('\nCom Builder pattern, a criação de objetos complexos é simplificada!');
