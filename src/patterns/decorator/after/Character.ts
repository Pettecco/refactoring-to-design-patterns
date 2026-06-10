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
    // Equipa a arma (pode ser uma arma base ou decorada)
    this.equippedWeapon = weapon;
  }

  public getAttackForce(): number {
    // Calcula a força de ataque somando dano base e dano da arma
    return this.baseDamage + this.equippedWeapon.getDamage();
  }

  public getSpeed(): number {
    // Calcula a velocidade somando velocidade base e bônus da arma
    return this.speed + this.equippedWeapon.getSpeedBonus();
  }
}
