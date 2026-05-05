import { Category } from './Category.js';
import { SearchType } from './SearchType.js';
import { SortBy } from './SortBy.js';

export class SearchParams {
  resultsPerPage: number = 15;
  category: Category = Category.ALL;
  searchType: SearchType = SearchType.NORMAL;
  sortBy: SortBy = SortBy.RELEVANCE;
}
