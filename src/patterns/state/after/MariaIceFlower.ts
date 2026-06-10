import { State } from './State.js';
import { MariaStateEnum } from './MariaStateEnum.js';
import { MariaSmall } from './MariaSmall.js';
import { MariaStar } from './MariaStar.js';

export class MariaIceFlower implements State {
  public pickIceFlower(): State {
    return this;
  }

  public pickFireFlower(): State {
    return this;
  }

  public pickStar(): State {
    return new MariaStar();
  }

  public takeDamage(): State {
    return new MariaSmall();
  }

  public getState(): MariaStateEnum {
    return MariaStateEnum.ICE_FLOWER;
  }
}
