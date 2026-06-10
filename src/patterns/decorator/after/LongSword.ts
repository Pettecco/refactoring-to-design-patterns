import { Weapon } from './Weapon.js';

export class LongSword implements Weapon {
  public getDamage(): number {
    // Retorna o dano base da espada longa
    return 15;
  }

  public getSpeedBonus(): number {
    // Retorna o bônus de velocidade da espada longa
    return 0;
  }
}
