import { State } from './State.js';
import { MariaStateEnum } from './MariaStateEnum.js';
import { MariaDead } from './MariaDead.js';
import { MariaIceFlower } from './MariaIceFlower.js';
import { MariaFireFlower } from './MariaFireFlower.js';
import { MariaStar } from './MariaStar.js';

export class MariaSmall implements State {
  public pickIceFlower(): State {
    return new MariaIceFlower();
  }

  public pickFireFlower(): State {
    return new MariaFireFlower();
  }

  public pickStar(): State {
    return new MariaStar();
  }

  public takeDamage(): State {
    return new MariaDead();
  }

  public getState(): MariaStateEnum {
    return MariaStateEnum.SMALL;
  }
}
