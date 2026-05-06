import { Renderable } from './Renderable.js';

export interface Button extends Renderable {
  onClick(): void;
}
