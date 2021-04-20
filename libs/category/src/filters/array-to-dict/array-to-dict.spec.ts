import { TestBed } from '@angular/core/testing';

import { DaffCategoryFilterReplacement } from '@daffodil/category';
import { DaffCategoryFilterFactory } from '@daffodil/category/testing';
import { Dict } from '@daffodil/core';

import { daffCategoryFilterArrayToDict } from './array-to-dict';

describe('@daffodil/category | filters | daffCategoryFilterArrayToDict', () => {
  let filterFactory: DaffCategoryFilterFactory;
  let filters: DaffCategoryFilterReplacement[];

  let result: Dict<DaffCategoryFilterReplacement>;

  beforeEach(() => {
    filterFactory = TestBed.inject(DaffCategoryFilterFactory);

    filters = filterFactory.createMany(3);

    result = daffCategoryFilterArrayToDict(filters);
  });

  it('should return a dict of the filters keyed by filter name', () => {
    filters.forEach(filter => {
      expect(result[filter.name]).toEqual(filter);
    });
  });
});
