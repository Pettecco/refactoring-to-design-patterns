import { Car } from './Car.js';
import { CarData } from './types.js';
export class ValidCarBuilder {
  private model: string;
  private manufacturer: string;
  private manufacturingYear: number;
  private plate: string;
  private color: string;
  private mileage: number;
  private modelYear: number;
  private minPrice: number;
  private advertisedPrice: number;

  constructor() {
    // Define valores padrão para um carro válido
    this.model = 'Model A';
    this.manufacturer = 'Manufacturer A';
    this.manufacturingYear = 2000;
    this.modelYear = 2001;
    this.plate = 'ABC1234';
    this.color = '';
    this.mileage = 0;
    this.minPrice = 0;
    this.advertisedPrice = 0;
  }

  public withColor(color: string): ValidCarBuilder {
    // Define a cor e retorna this para encadeamento
    this.color = color;
    return this;
  }

  public withMileage(mileage: number): ValidCarBuilder {
    // Define a quilometragem e retorna this para encadeamento
    this.mileage = mileage;
    return this;
  }

  public withMinPrice(minPrice: number): ValidCarBuilder {
    // Define o preço mínimo e retorna this para encadeamento
    this.minPrice = minPrice;
    return this;
  }

  public withAdvertisedPrice(advertisedPrice: number): ValidCarBuilder {
    // Define o preço anunciado e retorna this para encadeamento
    this.advertisedPrice = advertisedPrice;
    return this;
  }

  public withModel(model: string): ValidCarBuilder {
    // Define o modelo e retorna this para encadeamento
    this.model = model;
    return this;
  }

  public withManufacturer(manufacturer: string): ValidCarBuilder {
    // Define o fabricante e retorna this para encadeamento
    this.manufacturer = manufacturer;
    return this;
  }

  public withManufacturingYear(manufacturingYear: number): ValidCarBuilder {
    // Define o ano de fabricação e retorna this para encadeamento
    this.manufacturingYear = manufacturingYear;
    return this;
  }

  public withPlate(plate: string): ValidCarBuilder {
    // Define a placa e retorna this para encadeamento
    this.plate = plate;
    return this;
  }

  public withModelYear(modelYear: number): ValidCarBuilder {
    // Define o ano do modelo e retorna this para encadeamento
    this.modelYear = modelYear;
    return this;
  }

  public build(): Car {
    // Cria e retorna um novo objeto Carro com os valores configurados
    const data: CarData = {
      model: this.model,
      manufacturer: this.manufacturer,
      manufacturingYear: this.manufacturingYear,
      plate: this.plate,
      color: this.color,
      mileage: this.mileage,
      modelYear: this.modelYear,
      minPrice: this.minPrice,
      advertisedPrice: this.advertisedPrice,
    };
    return new Car(data);
  }
}
