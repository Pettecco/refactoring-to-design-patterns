import { SearchCriteria } from '../../before/SearchCriteria.js';

export interface SearchCriteriaFactory {
  createCriteria(): SearchCriteria;
}
