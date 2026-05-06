import { SearchParams } from '../../before/SearchParams.js';
import { SearchService } from '../../before/SearchService.js';
import { CriteriaFactory } from './CriteriaFactory.js';

export class Search {
  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  searchBy(params: SearchParams): void {
    const factory = new CriteriaFactory(params);
    const criteria = factory.createCriteria();
    const resultIds = this.searchService.performSearchWith(criteria);
    this.findProductsByIds(resultIds);
  }

  private findProductsByIds(ids: string[]): void {
    console.log(`Found products: ${ids.join(', ')}`);
  }
}
