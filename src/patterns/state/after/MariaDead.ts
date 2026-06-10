import { State } from './State.js';
import { MariaStateEnum } from './MariaStateEnum.js';

export class MariaDead implements State {
  public pickIceFlower(): State {
    return this;
  }

  public pickFireFlower(): State {
    return this;
  }

  public pickStar(): State {
    return this;
  }

  public takeDamage(): State {
    return this;
  }

  public getState(): MariaStateEnum {
    return MariaStateEnum.DEAD;
  }
}
