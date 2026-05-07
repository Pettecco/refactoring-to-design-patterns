import { Transport } from './interfaces/Transport.js';

// Creator
export abstract class Logistics {
  // Factory Method
  abstract createTransport(): Transport;

  planDelivery(): void {
    const transport = this.createTransport();
    transport.deliver();
  }
}
