import { WeaponEnchantment } from './WeaponEnchantment.js';

export class MagicWeapon extends WeaponEnchantment {
  public getDamage(): number {
    // Adiciona bônus de dano mágico ao dano da arma base
    return this.weapon.getDamage() + 5;
  }

  public getSpeedBonus(): number {
    // Adiciona bônus de velocidade mágica ao bônus da arma base
    return this.weapon.getSpeedBonus() + 4;
  }
}
