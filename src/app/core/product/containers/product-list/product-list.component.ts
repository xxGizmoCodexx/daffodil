import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '@daffodil/product/model/product';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../reducers';
import { ProductListLoad } from '@daffodil/product/actions/product-list.actions';

@Component({
  selector: '[product-list-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'ProductListContainer'
})
export class ProductListContainer implements OnInit {

  loading$: Observable<boolean>;
  products$: Observable<Product[]>;

  constructor(
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProductListLoad());

    this.loading$ = this.store.pipe(
      select(fromProduct.selectProductListLoadingState)
    );

    this.products$ = this.store.pipe(
      select(fromProduct.selectAllProducts)
    );
  }

}
