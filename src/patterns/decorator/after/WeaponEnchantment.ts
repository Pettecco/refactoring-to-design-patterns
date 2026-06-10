import { Weapon } from './Weapon.js';

export class WeaponEnchantment implements Weapon {
  protected weapon: Weapon;

  constructor(weapon: Weapon) {
    // Armazena a arma base para decorá-la
    this.weapon = weapon;
  }

  public getDamage(): number {
    // Delega para a arma base
    return this.weapon.getDamage();
  }

  public getSpeedBonus(): number {
    // Delega para a arma base
    return this.weapon.getSpeedBonus();
  }
}
