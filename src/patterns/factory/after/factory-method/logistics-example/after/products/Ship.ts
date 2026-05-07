import { Transport } from '../interfaces/Transport.js';

export class Ship implements Transport {
  deliver(): void {
    console.log('Delivering cargo by sea using a ship.');
  }
}
