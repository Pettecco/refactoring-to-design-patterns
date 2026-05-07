import { Transport } from '../interfaces/Transport.js';
import { Logistics } from '../Logistics.js';
import { Ship } from '../products/Ship.js';

export class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}
