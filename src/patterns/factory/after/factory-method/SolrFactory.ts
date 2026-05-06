import { Category } from '../../before/Category.js';
import { SearchCriteria } from '../../before/SearchCriteria.js';
import { SearchParams } from '../../before/SearchParams.js';
import { SearchType } from '../../before/SearchType.js';
import { SortBy } from '../../before/SortBy.js';
import { SearchCriteriaFactory } from './SearchCriteriaFactory.js';

export class SolrFactory implements SearchCriteriaFactory {
  private params: SearchParams;
  private collection: string = 'products_core';
  private timeout: number = 5000;

  constructor(params: SearchParams) {
    this.params = params;
  }

  createCriteria(): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = this.params.resultsPerPage * 2;
    criteria.category = this.params.category;
    criteria.sortBy = this.params.sortBy;

    if (this.params.searchType === SearchType.PROMOTIONAL) {
      criteria.category = Category.ON_SALE;
      criteria.sortBy = SortBy.PRICE;
    } else if (this.params.searchType === SearchType.BY_CATEGORY) {
      if (this.params.category === Category.ALL) {
        criteria.sortBy = SortBy.RELEVANCE;
      } else {
        criteria.sortBy = SortBy.RECENT;
      }
    }

    console.log(
      `Using Solr collection: ${this.collection}, timeout: ${this.timeout}ms`
    );
    return criteria;
  }
}
