import { Category } from "./Category.js";
import { SortBy } from "./SortBy.js";

export class SearchCriteria {
  pagination!: number;
  category!: Category;
  sortBy!: SortBy;
}
