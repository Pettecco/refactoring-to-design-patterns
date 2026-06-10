import { describe, it, expect } from '@jest/globals';
import { Character } from '../before/Character.js';
import { Dagger } from '../before/Dagger.js';
import { MagicDagger } from '../before/MagicDagger.js';
import { FlamingDagger } from '../before/FlamingDagger.js';
import { MagicFlamingDagger } from '../before/MagicFlamingDagger.js';

describe('Character (before Decorator)', () => {
  it('should increase attack force by 10 when equipping dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new Dagger());
    expect(character.getAttackForce()).toBe(15);
  });

  it('should increase attack force by 15 when equipping magic dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicDagger());
    expect(character.getAttackForce()).toBe(20);
  });

  it('should increase attack force by 12 when equipping flaming dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new FlamingDagger());
    expect(character.getAttackForce()).toBe(17);
  });

  it('should increase attack force by 17 when equipping magic flaming dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicFlamingDagger());
    expect(character.getAttackForce()).toBe(22);
  });

  it('should increase speed by 3 when equipping dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new Dagger());
    expect(character.getSpeed()).toBe(13);
  });

  it('should increase speed by 7 when equipping magic dagger', () => {
    const character = new Character(5, 10);
    character.equipWeapon(new MagicDagger());
    expect(character.getSpeed()).toBe(17);
  });
});
