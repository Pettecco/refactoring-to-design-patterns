import { State } from './State.js';
import { MariaStateEnum } from './MariaStateEnum.js';
import { MariaSmall } from './MariaSmall.js';

export class MariaCharacter {
  private currentState: State;

  constructor() {
    // Maria começa no estado pequena
    this.currentState = new MariaSmall();
  }

  public pickIceFlower(): void {
    // Delega a transição para o estado atual
    this.currentState = this.currentState.pickIceFlower();
  }

  public pickFireFlower(): void {
    // Delega a transição para o estado atual
    this.currentState = this.currentState.pickFireFlower();
  }

  public pickStar(): void {
    // Delega a transição para o estado atual
    this.currentState = this.currentState.pickStar();
  }

  public takeDamage(): void {
    // Delega a transição para o estado atual
    this.currentState = this.currentState.takeDamage();
  }

  public getCurrentState(): MariaStateEnum {
    return this.currentState.getState();
  }
}
