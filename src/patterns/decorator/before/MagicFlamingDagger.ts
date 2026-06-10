import { Weapon } from './Weapon.js';

export class MagicFlamingDagger implements Weapon {
  public getDamage(): number {
    return 17;
  }

  public getSpeedBonus(): number {
    return 7;
  }
}
