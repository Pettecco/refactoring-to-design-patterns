import { Weapon } from './Weapon.js';

export class Dagger implements Weapon {
  public getDamage(): number {
    return 10;
  }

  public getSpeedBonus(): number {
    return 3;
  }
}
