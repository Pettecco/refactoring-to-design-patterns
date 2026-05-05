import { SearchCriteria } from './SearchCriteria.js';
import { SearchParams } from './SearchParams.js';
import { Category } from './Category.js';
import { SearchType } from './SearchType.js';
import { SortBy } from './SortBy.js';
import { SearchService } from './SearchService.js';

export class Search {
  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  searchBy(params: SearchParams): void {
    const criteria = this.createCriteria(params);
    const resultIds = this.searchService.performSearchWith(criteria);
    this.findProductsByIds(resultIds);
  }

  private createCriteria(params: SearchParams): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = params.resultsPerPage;
    criteria.category = params.category;

    if (params.searchType === SearchType.PROMOTIONAL) {
      criteria.category = Category.ON_SALE;
      criteria.sortBy = SortBy.RECENT;
    } else if (params.searchType === SearchType.BY_CATEGORY) {
      criteria.category = params.category;
      if (params.category === Category.ALL) {
        criteria.sortBy = SortBy.RELEVANCE;
      } else {
        criteria.sortBy = SortBy.RECENT;
      }
    } else {
      criteria.sortBy = params.sortBy;
    }

    return criteria;
  }

  private findProductsByIds(ids: string[]): void {
    console.log(`Found products: ${ids.join(', ')}`);
  }
}
