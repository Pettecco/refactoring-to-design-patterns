import { WeaponEnchantment } from './WeaponEnchantment.js';

export class FlamingWeapon extends WeaponEnchantment {
  public getDamage(): number {
    // Adiciona bônus de dano de fogo ao dano da arma base
    return this.weapon.getDamage() + 8;
  }

  public getSpeedBonus(): number {
    // Retorna o bônus de velocidade da arma base (sem alteração)
    return this.weapon.getSpeedBonus();
  }
}
