import { Weapon } from './Weapon.js';

export class Dagger implements Weapon {
  public getDamage(): number {
    // Retorna o dano base da adaga
    return 10;
  }

  public getSpeedBonus(): number {
    // Retorna o bônus de velocidade da adaga
    return 3;
  }
}
