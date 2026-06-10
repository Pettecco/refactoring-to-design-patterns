import { Car } from './before/Car.js';

console.log('=== Builder Pattern - Before ===\n');

// Criar um carro válido requer passar muitos parâmetros
const car1 = new Car(
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

console.log('Car 1 valid?', car1.validate());
console.log('Model:', car1.getModel());
console.log('Plate:', car1.getPlate());

// Teste de validação: ano do modelo anterior ao de fabricação
const invalidCar = new Car(
  'model a',
  'manufacturer a',
  2000,
  'abc1234',
  '',
  0,
  1999,
  0,
  0
);

console.log('\nInvalid car valid?', invalidCar.validate());
console.log('Errors:', invalidCar.getErrors());
