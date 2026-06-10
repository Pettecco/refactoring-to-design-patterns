import { MariaStateEnum } from './MariaStateEnum.js';

export class MariaCharacter {
  private currentState: MariaStateEnum;

  constructor() {
    // Maria começa no estado pequena
    this.currentState = MariaStateEnum.SMALL;
  }

  public getCurrentState(): MariaStateEnum {
    return this.currentState;
  }

  public pickIceFlower(): void {
    // Se já tem estrela, não muda de estado
    if (this.currentState === MariaStateEnum.STAR) {
      return;
    }
    this.currentState = MariaStateEnum.ICE_FLOWER;
  }

  public pickFireFlower(): void {
    // Se já tem estrela, não muda de estado
    if (this.currentState === MariaStateEnum.STAR) {
      return;
    }
    this.currentState = MariaStateEnum.FIRE_FLOWER;
  }

  public pickStar(): void {
    // Pega estrela independente do estado atual
    this.currentState = MariaStateEnum.STAR;
  }

  public takeDamage(): void {
    // Se tem estrela, não perde poder
    if (this.currentState === MariaStateEnum.STAR) {
      return;
    }
    // Se é pequena, morre; senão volta a ser pequena
    if (this.currentState === MariaStateEnum.SMALL) {
      this.currentState = MariaStateEnum.DEAD;
    } else {
      this.currentState = MariaStateEnum.SMALL;
    }
  }
}
