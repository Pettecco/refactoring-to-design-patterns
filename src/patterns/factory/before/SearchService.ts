import { SearchCriteria } from './SearchCriteria.js';

export class SearchService {
  performSearchWith(criteria: SearchCriteria): string[] {
    console.log(`Searching with criteria:`, criteria);
    return ['product-1', 'product-2', 'product-3'];
  }
}
