import { CarData } from './types.js';

export class Car {
  private model: string;
  private manufacturer: string;
  private manufacturingYear: number;
  private plate: string;
  private color: string;
  private mileage: number;
  private modelYear: number;
  private minPrice: number;
  private advertisedPrice: number;
  private errors: string[];

  constructor(data: CarData) {
    // Atribui os dados do objeto aos atributos da classe
    this.model = data.model;
    this.manufacturer = data.manufacturer;
    this.manufacturingYear = data.manufacturingYear;
    this.plate = data.plate;
    this.color = data.color;
    this.mileage = data.mileage;
    this.modelYear = data.modelYear;
    this.minPrice = data.minPrice;
    this.advertisedPrice = data.advertisedPrice;
    this.errors = [];
  }

  public validate(): boolean {
    // Valida se todos os campos obrigatórios estão preenchidos
    this.errors = [];

    if (!this.model) {
      this.errors.push('model cannot be null');
    }
    if (!this.manufacturer) {
      this.errors.push('manufacturer cannot be null');
    }
    if (!this.plate) {
      this.errors.push('plate cannot be null');
    }
    if (this.modelYear < this.manufacturingYear) {
      this.errors.push('model year cannot be earlier than manufacturing year');
    }

    return this.errors.length === 0;
  }

  public getErrors(): string[] {
    return this.errors;
  }

  public getModel(): string {
    return this.model;
  }

  public getManufacturer(): string {
    return this.manufacturer;
  }

  public getManufacturingYear(): number {
    return this.manufacturingYear;
  }

  public getPlate(): string {
    return this.plate;
  }

  public getColor(): string {
    return this.color;
  }

  public getMileage(): number {
    return this.mileage;
  }

  public getModelYear(): number {
    return this.modelYear;
  }

  public getMinPrice(): number {
    return this.minPrice;
  }

  public getAdvertisedPrice(): number {
    return this.advertisedPrice;
  }
}
