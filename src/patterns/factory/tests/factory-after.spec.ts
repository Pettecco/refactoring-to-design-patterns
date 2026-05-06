import { describe, it, expect } from '@jest/globals';
import { SearchParams } from '../before/SearchParams.js';
import { SearchType } from '../before/SearchType.js';
import { Category } from '../before/Category.js';
import { SortBy } from '../before/SortBy.js';
import { CriteriaFactory } from '../after/simple-factory/CriteriaFactory.js';

describe('Factory Pattern - After (CriteriaFactory)', () => {
  it('should create normal search criteria with default values', () => {
    const params = new SearchParams();
    const factory = new CriteriaFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.pagination).toBe(15);
    expect(criteria.sortBy).toBe(SortBy.RELEVANCE);
    expect(criteria.category).toBe(Category.ALL);
  });

  it('should create normal search with custom pagination', () => {
    const params = new SearchParams();
    params.resultsPerPage = 20;

    const factory = new CriteriaFactory(params);
    const criteria = factory.createCriteria();

    expect(criteria.pagination).toBe(20);
  });

  it('should create promotional search ignoring other params', () => {
    const params = new SearchParams();
    params.searchType = SearchType.PROMOTIONAL;
    params.category = Category.ELECTRONICS;
    params.sortBy = SortBy.PRICE;

    const factory = new CriteriaFactory(params);
    const criteria = factory.createCriteria();

    expect(criteria.category).toBe(Category.ON_SALE);
    expect(criteria.sortBy).toBe(SortBy.RECENT);
  });

  it('should create category search with RECENT sort when category is specified', () => {
    const params = new SearchParams();
    params.searchType = SearchType.BY_CATEGORY;
    params.category = Category.ELECTRONICS;

    const factory = new CriteriaFactory(params);
    const criteria = factory.createCriteria();

    expect(criteria.category).toBe(Category.ELECTRONICS);
    expect(criteria.sortBy).toBe(SortBy.RECENT);
  });

  it('should create category search with RELEVANCE when category is ALL', () => {
    const params = new SearchParams();
    params.searchType = SearchType.BY_CATEGORY;
    params.category = Category.ALL;

    const factory = new CriteriaFactory(params);
    const criteria = factory.createCriteria();

    expect(criteria.category).toBe(Category.ALL);
    expect(criteria.sortBy).toBe(SortBy.RELEVANCE);
  });
});
