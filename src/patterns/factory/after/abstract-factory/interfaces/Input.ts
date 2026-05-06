import { Renderable } from './Renderable.js';

export interface Input extends Renderable {
  getValue(): string;
}
