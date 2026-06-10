import { MariaStateEnum } from './MariaStateEnum.js';

export interface State {
  pickIceFlower(): State;
  pickFireFlower(): State;
  pickStar(): State;
  takeDamage(): State;
  getState(): MariaStateEnum;
}
