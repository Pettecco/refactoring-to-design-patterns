import { Category } from '../before/Category.js';
import { SearchCriteria } from '../before/SearchCriteria.js';
import { SearchParams } from '../before/SearchParams.js';
import { SearchType } from '../before/SearchType.js';
import { SortBy } from '../before/SortBy.js';

export class CriteriaFactory {
  private params: SearchParams;

  constructor(params: SearchParams) {
    this.params = params;
  }

  private createNormalCriteria(): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = this.params.resultsPerPage;
    criteria.category = this.params.category;
    criteria.sortBy = this.params.sortBy;
    return criteria;
  }

  private createPromotionalCriteria(): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = this.params.resultsPerPage;
    criteria.category = Category.ON_SALE;
    criteria.sortBy = SortBy.RECENT;
    return criteria;
  }

  private   createCategoryCriteria(): SearchCriteria {
    const criteria = new SearchCriteria();
    criteria.pagination = this.params.resultsPerPage;
    criteria.category = this.params.category;
    if (this.params.category === Category.ALL) {
      criteria.sortBy = SortBy.RELEVANCE;
    } else {
      criteria.sortBy = SortBy.RECENT;
    }
    return criteria;
  }

  createCriteria(): SearchCriteria {
    if (this.params.searchType === SearchType.PROMOTIONAL) {
      return this.createPromotionalCriteria();
    } else if (this.params.searchType === SearchType.BY_CATEGORY) {
      return this.createCategoryCriteria();
    } else {
      return this.createNormalCriteria();
    }
  }
}
