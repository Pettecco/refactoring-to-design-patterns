import { Transport } from '../interfaces/Transport.js';
import { Logistics } from '../Logistics.js';
import { Truck } from '../products/Truck.js';

export class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}
