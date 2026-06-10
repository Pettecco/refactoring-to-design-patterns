import { MariaCharacter } from './after/MariaCharacter.js';
import { MariaStateEnum } from './after/MariaStateEnum.js';

const maria = new MariaCharacter();
console.log('Estado inicial:', maria.getCurrentState());

maria.pickIceFlower();
console.log('Após pegar flor de gelo:', maria.getCurrentState());

maria.pickFireFlower();
console.log('Após pegar flor de fogo:', maria.getCurrentState());

maria.takeDamage();
console.log('Após levar dano:', maria.getCurrentState());

maria.pickStar();
console.log('Após pegar estrela:', maria.getCurrentState());

maria.takeDamage();
console.log('Após levar dano (mantém estrela):', maria.getCurrentState());

console.log('\nCom State pattern, cada estado gerencia suas próprias transições!');
