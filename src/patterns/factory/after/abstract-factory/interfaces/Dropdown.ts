import { Renderable } from './Renderable.js';

export interface Dropdown extends Renderable {
  select(option: string): void;
}
