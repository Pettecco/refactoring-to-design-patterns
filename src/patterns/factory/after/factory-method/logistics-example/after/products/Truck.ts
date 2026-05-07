import { Transport } from '../interfaces/Transport.js';

export class Truck implements Transport {
  deliver(): void {
    console.log('Delivering cargo by road using a truck');
  }
}
