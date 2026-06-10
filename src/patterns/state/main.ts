import { MariaCharacter } from './before/MariaCharacter.js';
import { MariaStateEnum } from './before/MariaStateEnum.js';

const maria = new MariaCharacter();
console.log('Estado inicial:', maria.getCurrentState());

maria.pickIceFlower();
console.log('Após pegar flor de gelo:', maria.getCurrentState());

maria.takeDamage();
console.log('Após levar dano:', maria.getCurrentState());

maria.pickStar();
console.log('Após pegar estrela:', maria.getCurrentState());

maria.takeDamage();
console.log('Após levar dano (deveria manter estrela):', maria.getCurrentState());
