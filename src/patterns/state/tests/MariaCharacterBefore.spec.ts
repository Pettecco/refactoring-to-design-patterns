import { describe, it, expect } from '@jest/globals';
import { MariaCharacter } from '../before/MariaCharacter.js';
import { MariaStateEnum } from '../before/MariaStateEnum.js';

describe('MariaCharacter (before State)', () => {
  it('should start as small Maria', () => {
    const maria = new MariaCharacter();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.SMALL);
  });

  it('should become ice flower when small Maria gets ice flower', () => {
    const maria = new MariaCharacter();
    maria.pickIceFlower();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.ICE_FLOWER);
  });

  it('should become fire flower when small Maria gets fire flower', () => {
    const maria = new MariaCharacter();
    maria.pickFireFlower();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.FIRE_FLOWER);
  });

  it('should become star when Maria gets star', () => {
    const maria = new MariaCharacter();
    maria.pickStar();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.STAR);
  });

  it('should die when small Maria takes damage', () => {
    const maria = new MariaCharacter();
    maria.takeDamage();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.DEAD);
  });

  it('should become small when ice flower Maria takes damage', () => {
    const maria = new MariaCharacter();
    maria.pickIceFlower();
    maria.takeDamage();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.SMALL);
  });

  it('should become small when fire flower Maria takes damage', () => {
    const maria = new MariaCharacter();
    maria.pickFireFlower();
    maria.takeDamage();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.SMALL);
  });

  it('should stay as star when star Maria takes damage', () => {
    const maria = new MariaCharacter();
    maria.pickStar();
    maria.takeDamage();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.STAR);
  });

  it('should stay as star when star Maria gets ice flower', () => {
    const maria = new MariaCharacter();
    maria.pickStar();
    maria.pickIceFlower();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.STAR);
  });

  it('should stay as star when star Maria gets fire flower', () => {
    const maria = new MariaCharacter();
    maria.pickStar();
    maria.pickFireFlower();
    expect(maria.getCurrentState()).toBe(MariaStateEnum.STAR);
  });
});
