import { Dictionary } from '@ngrx/entity';
import {
  createSelector,
  MemoizedSelector,
  defaultMemoize,
} from '@ngrx/store';

import {
  DaffGenericCategory,
  DaffCategory,
} from '@daffodil/category';
import { DaffProduct } from '@daffodil/product';
import { getDaffProductSelectors } from '@daffodil/product/state';

import { DaffCategoryStateRootSlice } from '../reducers/public_api';
import { DaffCategoryEntitiesMemoizedSelectors } from './category-entities/category-entities.selector';
import { getDaffCategoryEntitiesSelectors } from './category-entities/category-entities.selector';
import {
  DaffCategoryFeatureMemoizedSelectors,
  getDaffCategoryFeatureSelector,
} from './category-feature.selector';
import {
  DaffCategoryPageMemoizedSelectors,
  getDaffCategoryPageSelectors,
} from './category-page/category-page.selector';
import {
  DaffCategoryPageProductCollectionSelectors,
  getCategoryProductCollectionSelectors,
} from './collection/selectors';

/**
 * An interface for selectors that combine category metadata and category entities selectors.
 */
export interface DaffCategoryMemoizedSelectors<
  V extends DaffGenericCategory<V> = DaffCategory,
  W extends DaffProduct = DaffProduct
> extends
  DaffCategoryFeatureMemoizedSelectors<V>,
  DaffCategoryPageMemoizedSelectors<V>,
  DaffCategoryPageProductCollectionSelectors,
  DaffCategoryEntitiesMemoizedSelectors<V> {
  /**
   * Selects the current category
   */
  selectCurrentCategory: MemoizedSelector<DaffCategoryStateRootSlice<V>, V>;
  /**
   * Selects the products of the current category.
   */
  selectCategoryPageProducts: MemoizedSelector<DaffCategoryStateRootSlice<V, W>, W[]>;
  /**
   * Selects a category by id.
   *
   * @param categoryId a category id.
   */
  selectCategory: (categoryId: V['id']) => MemoizedSelector<DaffCategoryStateRootSlice<V>, V>;
  /**
   * Selects products by category id.
   *
   * @param categoryId a category id.
   */
  selectProductsByCategory: (categoryId: V['id']) => MemoizedSelector<DaffCategoryStateRootSlice<V, W>, W[]>;
  /**
   * Selects the total number of products in a category.
   *
   * @param categoryId a category id.
   */
  selectTotalProductsByCategory: (categoryId: V['id']) => MemoizedSelector<DaffCategoryStateRootSlice<V>, number>;
}

const createCategorySelectors = <V extends DaffGenericCategory<V>, W extends DaffProduct>(): DaffCategoryMemoizedSelectors<V, W> => {
  const { selectAllProducts,selectProductEntities } = getDaffProductSelectors<W>();

  const {
    selectCategoryEntities,
  } = getDaffCategoryEntitiesSelectors<V>();
  const {
    selectCurrentCategoryId,
    selectCategoryPageProductIds,
  } = getDaffCategoryPageSelectors<V>();
  /**
   * Combinatoric Category Selectors
   */
  const selectCurrentCategory = createSelector<DaffCategoryStateRootSlice<V, W>, [Dictionary<V>, string], V>(
    selectCategoryEntities,
    selectCurrentCategoryId,
    (entities: Dictionary<V>, currentCategoryId: V['id']) => entities[currentCategoryId],
  );

  const selectCategoryPageProducts = createSelector<DaffCategoryStateRootSlice<V, W>, [string[], Dictionary<W>], W[]>(
    selectCategoryPageProductIds,
    selectProductEntities,
    (ids, products: Dictionary<W>) => ids.map(id => products[id]).filter(p => p != null),
  );

  const selectCategory: (categoryId: V['id']) => MemoizedSelector<DaffCategoryStateRootSlice<V>, V> =
    defaultMemoize((categoryId: V['id']) => createSelector(
      selectCategoryEntities,
      (entities: Dictionary<V>) => entities[categoryId],
    )).memoized;

  const selectProductsByCategory = defaultMemoize((categoryId: V['id']) => createSelector<DaffCategoryStateRootSlice<V, W>, [V, W[]], W[]>(
    selectCategory(categoryId),
    selectAllProducts,
    (category, products) => category?.product_ids
      ? products.filter(product => category.product_ids.indexOf(product.id) >= 0)
      : [],
  )).memoized;

  const selectTotalProductsByCategory = defaultMemoize((categoryId: V['id']) => createSelector(
    selectProductsByCategory(categoryId),
    (products: DaffProduct[]) => products.length,
  )).memoized;

  return {
    ...getDaffCategoryFeatureSelector<V>(),
    ...getDaffCategoryEntitiesSelectors<V>(),
    ...getDaffCategoryPageSelectors<V>(),
    ...getCategoryProductCollectionSelectors(),
    selectCurrentCategory,
    selectCategoryPageProducts,
    selectCategory,
    selectProductsByCategory,
    selectTotalProductsByCategory,
  };
};

/**
 * A function that returns all combinatoric category selectors.
 */
export const getDaffCategorySelectors = (() => {
  let cache;
  return <
    V extends DaffGenericCategory<V> = DaffCategory,
    W extends DaffProduct = DaffProduct
  >(): DaffCategoryMemoizedSelectors<V, W> => cache = cache
    ? cache
    : createCategorySelectors<V, W>();
})();
