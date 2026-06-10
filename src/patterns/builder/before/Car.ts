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

  constructor(
    model: string,
    manufacturer: string,
    manufacturingYear: number,
    plate: string,
    color: string,
    mileage: number,
    modelYear: number,
    minPrice: number,
    advertisedPrice: number
  ) {
    // Atribui todos os parâmetros aos atributos da classe
    this.model = model;
    this.manufacturer = manufacturer;
    this.manufacturingYear = manufacturingYear;
    this.plate = plate;
    this.color = color;
    this.mileage = mileage;
    this.modelYear = modelYear;
    this.minPrice = minPrice;
    this.advertisedPrice = advertisedPrice;
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
