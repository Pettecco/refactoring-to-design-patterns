import { Weapon } from './Weapon.js';

export class MagicDagger implements Weapon {
  public getDamage(): number {
    return 15;
  }

  public getSpeedBonus(): number {
    return 7;
  }
}
