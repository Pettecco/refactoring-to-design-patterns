import { Weapon } from './Weapon.js';

export class FlamingDagger implements Weapon {
  public getDamage(): number {
    return 12;
  }

  public getSpeedBonus(): number {
    return 3;
  }
}
