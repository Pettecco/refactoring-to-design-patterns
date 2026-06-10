import { Character } from './before/Character.js';
import { Dagger } from './before/Dagger.js';
import { MagicDagger } from './before/MagicDagger.js';

console.log('=== Decorator Pattern - Before ===\n');

const character1 = new Character(5, 10);
character1.equipWeapon(new Dagger());
console.log('Character with Dagger:');
console.log('  Attack Force:', character1.getAttackForce());
console.log('  Speed:', character1.getSpeed());

const character2 = new Character(5, 10);
character2.equipWeapon(new MagicDagger());
console.log('\nCharacter with Magic Dagger:');
console.log('  Attack Force:', character2.getAttackForce());
console.log('  Speed:', character2.getSpeed());

console.log('\nProblem: Need a new class for each weapon+enchantment combination!');
