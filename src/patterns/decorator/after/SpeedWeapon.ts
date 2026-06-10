import { WeaponEnchantment } from './WeaponEnchantment.js';

export class SpeedWeapon extends WeaponEnchantment {
  public getDamage(): number {
    // Retorna o dano da arma base (sem alteração)
    return this.weapon.getDamage();
  }

  public getSpeedBonus(): number {
    // Adiciona bônus de velocidade extra ao bônus da arma base
    return this.weapon.getSpeedBonus() + 5;
  }
}
