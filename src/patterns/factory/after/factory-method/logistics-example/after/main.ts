import { RoadLogistics } from './concrete-creators/RoadLogistics.js';
import { SeaLogistics } from './concrete-creators/SeaLogistics.js';

const road = new RoadLogistics();
road.planDelivery();

const sea = new SeaLogistics();
sea.planDelivery();
