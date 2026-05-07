import { Logistics } from './Logistics.js';
import { TransportType } from './TransportType.js';

const logistics1 = new Logistics(TransportType.TRUCK);
logistics1.planDelivery();

const logistics2 = new Logistics(TransportType.SHIP);
logistics2.planDelivery();
