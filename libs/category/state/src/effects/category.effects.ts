import {
  Injectable,
  Inject,
} from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  of,
  Observable,
} from 'rxjs';
import {
  switchMap,
  catchError,
  mergeMap,
} from 'rxjs/operators';

import {
  DaffGenericCategory,
  DaffGetCategoryResponse,
  DAFF_CATEGORY_ERROR_MATCHER,
} from '@daffodil/category';
import {
  DaffCategoryDriver,
  DaffCategoryServiceInterface,
} from '@daffodil/category/driver';
import { DaffError } from '@daffodil/core';
import { ErrorTransformer } from '@daffodil/core/state';
import { DaffProduct } from '@daffodil/product';
import { DaffProductGridLoadSuccess } from '@daffodil/product/state';

import {
  DaffCategoryActionTypes,
  DaffCategoryLoad,
  DaffCategoryLoadSuccess,
  DaffCategoryLoadFailure,
} from '../actions/category.actions';

@Injectable()
export class DaffCategoryEffects<
  V extends DaffGenericCategory<V>,
  W extends DaffProduct
> {

  constructor(
    private actions$: Actions,
    @Inject(DaffCategoryDriver) private driver: DaffCategoryServiceInterface<V,W>,
    @Inject(DAFF_CATEGORY_ERROR_MATCHER) private errorMatcher: ErrorTransformer,
  ) {}


  loadCategory$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(DaffCategoryActionTypes.CategoryLoadAction),
    mergeMap((action: DaffCategoryLoad) => this.driver.get(action.request).pipe(
      switchMap((resp: DaffGetCategoryResponse<V,W>) => of(
        new DaffProductGridLoadSuccess(resp.products),
        new DaffCategoryLoadSuccess(resp),
      )),
      catchError((error: DaffError) => of(new DaffCategoryLoadFailure(this.errorMatcher(error)))),
    )),
  ));
}
