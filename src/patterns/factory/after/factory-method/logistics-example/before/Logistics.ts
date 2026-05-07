import { Truck } from './Truck.js';
import { Ship } from './Ship.js';
import { TransportType } from './TransportType.js';

export class Logistics {
  constructor(private type: TransportType) {}

  planDelivery(): void {
    if (this.type === TransportType.TRUCK) {
      const truck = new Truck();
      truck.deliver();
    } else if (this.type === TransportType.SHIP) {
      const ship = new Ship();
      ship.deliver();
    }
  }
}
