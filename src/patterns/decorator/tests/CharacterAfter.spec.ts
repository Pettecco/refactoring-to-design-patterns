import { describe, it, expect } from '@jest/globals';
import { Character } from '../after/Character.js';
import { Dagger } from '../after/Dagger.js';
import { LongSword } from '../after/LongSword.js';
import { MagicWeapon } from '../after/MagicWeapon.js';
import { FlamingWeapon } from '../after/FlamingWeapon.js';
import { SpeedWeapon } from '../after/SpeedWeapon.js';

describe('Character (after Decorator)', () => {
  it('should increase attack force by 10 when equipping dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new Dagger());
    expect(character.getAttackForce()).toBe(15);
  });

  it('should increase attack force by 15 when equipping magic dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicWeapon(new Dagger()));
    expect(character.getAttackForce()).toBe(20);
  });

  it('should increase attack force by 18 when equipping flaming dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new FlamingWeapon(new Dagger()));
    expect(character.getAttackForce()).toBe(23);
  });

  it('should increase attack force by 23 when equipping magic flaming dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new FlamingWeapon(new MagicWeapon(new Dagger())));
    expect(character.getAttackForce()).toBe(28);
  });

  it('should increase attack force by 15 when equipping long sword', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new LongSword());
    expect(character.getAttackForce()).toBe(20);
  });

  it('should increase attack force by 20 when equipping magic long sword', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicWeapon(new LongSword()));
    expect(character.getAttackForce()).toBe(25);
  });

  it('should increase speed by 7 when equipping magic dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicWeapon(new Dagger()));
    expect(character.getSpeed()).toBe(17); // 10 + 3 + 4 = 17
  });

  it('should increase speed by 12 when equipping magic speed dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new SpeedWeapon(new MagicWeapon(new Dagger())));
    expect(character.getSpeed()).toBe(22); // 10 + 3 + 4 + 5 = 22
  });

  it('should stack multiple enchantments correctly', () => {
    const character = new Character(5, 10);
    // Adaga Mágica Flamejante da Velocidade
    character.equipWeapon(
      new SpeedWeapon(new FlamingWeapon(new MagicWeapon(new Dagger())))
    );
    expect(character.getAttackForce()).toBe(28); // 5 + 10 + 5 + 8 = 28
    expect(character.getSpeed()).toBe(22); // 10 + 3 + 4 + 0 + 5 = 22
  });
});

describe('Weapon decorators', () => {
  it('should create magic weapon with correct bonuses', () => {
    const magicDagger = new MagicWeapon(new Dagger());
    expect(magicDagger.getDamage()).toBe(15);
    expect(magicDagger.getSpeedBonus()).toBe(7);
  });

  it('should create flaming weapon with correct bonuses', () => {
    const flamingDagger = new FlamingWeapon(new Dagger());
    expect(flamingDagger.getDamage()).toBe(18);
    expect(flamingDagger.getSpeedBonus()).toBe(3);
  });

  it('should create speed weapon with correct bonuses', () => {
    const speedDagger = new SpeedWeapon(new Dagger());
    expect(speedDagger.getDamage()).toBe(10);
    expect(speedDagger.getSpeedBonus()).toBe(8);
  });

  it('should allow chaining multiple decorators', () => {
    const magicFlamingDagger = new FlamingWeapon(
      new MagicWeapon(new Dagger())
    );
    expect(magicFlamingDagger.getDamage()).toBe(23);
    expect(magicFlamingDagger.getSpeedBonus()).toBe(7);
  });
});
