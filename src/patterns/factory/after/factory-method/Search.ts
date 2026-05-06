import { SearchService } from '../../before/SearchService.js';
import { SearchCriteriaFactory } from './SearchCriteriaFactory.js';

export class Search {
  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  searchBy(factory: SearchCriteriaFactory): void {
    const criteria = factory.createCriteria();
    const resultIds = this.searchService.performSearchWith(criteria);
    this.findProductsByIds(resultIds);
  }

  private findProductsByIds(ids: string[]): void {
    console.log(`Found products: ${ids.join(', ')}`);
  }
}
