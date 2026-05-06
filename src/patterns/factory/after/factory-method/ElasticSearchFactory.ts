import { Category } from '../../before/Category.js';
import { SearchCriteria } from '../../before/SearchCriteria.js';
import { SearchParams } from '../../before/SearchParams.js';
import { SearchType } from '../../before/SearchType.js';
import { SortBy } from '../../before/SortBy.js';
import { SearchCriteriaFactory } from './SearchCriteriaFactory.js';

export class ElasticSearchFactory implements SearchCriteriaFactory {
  private params: SearchParams;
  private host: string = 'elasticsearch.myhost.com';
  private port: number = 4004;

  constructor(params: SearchParams) {
    this.params = params;
  }

  createCriteria(): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = this.params.resultsPerPage;
    criteria.category = this.params.category;
    criteria.sortBy = this.params.sortBy;

    if (this.params.searchType === SearchType.PROMOTIONAL) {
      criteria.category = Category.ON_SALE;
      criteria.sortBy = SortBy.RECENT;
    } else if (this.params.searchType === SearchType.BY_CATEGORY) {
      if (this.params.category === Category.ALL) {
        criteria.sortBy = SortBy.RELEVANCE;
      } else {
        criteria.sortBy = SortBy.RECENT;
      }
    }

    console.log(`Using ElasticSearch at ${this.host}:${this.port}`);
    return criteria;
  }
}
