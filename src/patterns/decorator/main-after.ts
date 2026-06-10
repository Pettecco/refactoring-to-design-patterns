import { Character } from './after/Character.js';
import { Dagger } from './after/Dagger.js';
import { LongSword } from './after/LongSword.js';
import { MagicWeapon } from './after/MagicWeapon.js';
import { FlamingWeapon } from './after/FlamingWeapon.js';
import { SpeedWeapon } from './after/SpeedWeapon.js';

console.log('=== Decorator Pattern - After ===\n');

// Personagem com adaga simples
const character1 = new Character(5, 10);
character1.equipWeapon(new Dagger());
console.log('Character with Dagger:');
console.log('  Attack Force:', character1.getAttackForce());
console.log('  Speed:', character1.getSpeed());

// Personagem com adaga mágica
const character2 = new Character(5, 10);
character2.equipWeapon(new MagicWeapon(new Dagger()));
console.log('\nCharacter with Magic Dagger:');
console.log('  Attack Force:', character2.getAttackForce());
console.log('  Speed:', character2.getSpeed());

// Personagem com adaga mágica flamejante
const character3 = new Character(5, 10);
character3.equipWeapon(new FlamingWeapon(new MagicWeapon(new Dagger())));
console.log('\nCharacter with Magic Flaming Dagger:');
console.log('  Attack Force:', character3.getAttackForce());
console.log('  Speed:', character3.getSpeed());

// Personagem com adaga mágica flamejante da velocidade
const character4 = new Character(5, 10);
character4.equipWeapon(
  new SpeedWeapon(new FlamingWeapon(new MagicWeapon(new Dagger())))
);
console.log('\nCharacter with Magic Flaming Speed Dagger:');
console.log('  Attack Force:', character4.getAttackForce());
console.log('  Speed:', character4.getSpeed());

// Personagem com espada longa mágica
const character5 = new Character(5, 10);
character5.equipWeapon(new MagicWeapon(new LongSword()));
console.log('\nCharacter with Magic Long Sword:');
console.log('  Attack Force:', character5.getAttackForce());
console.log('  Speed:', character5.getSpeed());

console.log('\nCom Decorator pattern, encantamentos podem ser combinados dinamicamente!');
