import { Weapon } from './Weapon.js';

export class Character {
  private baseDamage: number;
  private speed: number;
  private equippedWeapon: Weapon;

  constructor(baseDamage: number, speed: number) {
    this.baseDamage = baseDamage;
    this.speed = speed;
  }

  public equipWeapon(weapon: Weapon): void {
    this.equippedWeapon = weapon;
  }

  public getAttackForce(): number {
    return this.baseDamage + this.equippedWeapon.getDamage();
  }

  public getSpeed(): number {
    return this.speed + this.equippedWeapon.getSpeedBonus();
  }
}
