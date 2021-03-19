import { Action } from '@ngrx/store';

import { DaffStateError } from '@daffodil/core/state';
import { DaffProduct } from '@daffodil/product';

/**
 * Action types for Product Page Actions.
 */
export enum DaffProductPageActionTypes {
    ProductPageLoadAction = '[Product Page] Load Action',
    ProductPageLoadSuccessAction = '[Product Page] Load Success Action',
    ProductPageLoadFailureAction = '[Product Page] Load Failure Action',
		UpdateQtyAction = '[Product Page] Update Qty Action'
}

/**
 * An action triggered to initialize a product page load.
 * This is intended to be used for loading a product page rather than only a product.
 *
 * @param payload - Id of the requested product
 */
export class DaffProductPageLoad implements Action {
  readonly type = DaffProductPageActionTypes.ProductPageLoadAction;

  constructor(public payload: string) { }
}

/**
 * An action triggered upon a successful product page request.
 *
 * @param payload - A DaffProduct
 */
export class DaffProductPageLoadSuccess<T extends DaffProduct = DaffProduct> implements Action {
  readonly type = DaffProductPageActionTypes.ProductPageLoadSuccessAction;

  constructor(public payload: T) { }
}

/**
 * An action triggered upon a failed product page request.
 *
 * @param payload - an error message
 */
export class DaffProductPageLoadFailure implements Action {
  readonly type = DaffProductPageActionTypes.ProductPageLoadFailureAction;

  constructor(public payload: DaffStateError) { }
}

/**
 * Update the qty of the selected product.
 *
 * @param payload - The qty of the product.
 */
export class DaffProductPageUpdateQty implements Action {
    readonly type = DaffProductPageActionTypes.UpdateQtyAction;

    constructor(public payload: number) {}
}

export type DaffProductPageActions<T extends DaffProduct = DaffProduct> =
    | DaffProductPageLoad
    | DaffProductPageLoadSuccess<T>
    | DaffProductPageLoadFailure
		| DaffProductPageUpdateQty;
