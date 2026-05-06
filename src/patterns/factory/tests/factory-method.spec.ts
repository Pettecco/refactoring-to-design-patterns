import { describe, it, expect } from '@jest/globals';
import { SearchParams } from '../before/SearchParams.js';
import { SearchType } from '../before/SearchType.js';
import { Category } from '../before/Category.js';
import { SortBy } from '../before/SortBy.js';
import { ElasticSearchFactory } from '../after/factory-method/ElasticSearchFactory.js';
import { SolrFactory } from '../after/factory-method/SolrFactory.js';
import { DatabaseFactory } from '../after/factory-method/DatabaseFactory.js';
import { Search } from '../after/factory-method/Search.js';
import { SearchService } from '../before/SearchService.js';

describe('Factory Method Pattern', () => {
  it('should create criteria using ElasticSearch factory', () => {
    const params = new SearchParams();
    const factory = new ElasticSearchFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.pagination).toBe(15);
    expect(criteria.category).toBe(Category.ALL);
    expect(criteria.sortBy).toBe(SortBy.RELEVANCE);
  });

  it('should create criteria using Solr factory with different pagination', () => {
    const params = new SearchParams();
    const factory = new SolrFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.pagination).toBe(30);
  });

  it('should create promotional criteria using ElasticSearch factory', () => {
    const params = new SearchParams();
    params.searchType = SearchType.PROMOTIONAL;
    const factory = new ElasticSearchFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.category).toBe(Category.ON_SALE);
    expect(criteria.sortBy).toBe(SortBy.RECENT);
  });

  it('should create promotional criteria using Solr factory with different sort', () => {
    const params = new SearchParams();
    params.searchType = SearchType.PROMOTIONAL;
    const factory = new SolrFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.category).toBe(Category.ON_SALE);
    expect(criteria.sortBy).toBe(SortBy.PRICE);
  });

  it('should create criteria using Database factory', () => {
    const params = new SearchParams();
    const factory = new DatabaseFactory(params);

    const criteria = factory.createCriteria();

    expect(criteria.pagination).toBe(15);
  });

  it('should use factory with Search class (dependency inversion)', () => {
    const params = new SearchParams();
    const factory = new ElasticSearchFactory(params);
    const search = new Search(new SearchService());

    expect(() => search.searchBy(factory)).not.toThrow();
  });
});
