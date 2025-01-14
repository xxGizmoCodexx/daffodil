import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfoUtilities,
  ParsedRequestUrl,
  STATUS,
  RequestInfo,
} from 'angular-in-memory-web-api';

import { DaffCartTotalTypeEnum } from '@daffodil/cart';
import { DaffCartWithStoreCredit } from '@daffodil/cart-store-credit';
import { DaffCartWithStoreCreditFactory } from '@daffodil/cart-store-credit/testing';
import { DaffInMemoryBackendCartRootService } from '@daffodil/cart/driver/in-memory';
import { DaffCustomerStoreCreditInMemoryBackendService } from '@daffodil/customer-store-credit/driver/in-memory';


/**
 * An in-memory service that handles cart store credit HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class DaffCartStoreCreditInMemoryBackendService implements InMemoryDbService {
  constructor(
    private factory: DaffCartWithStoreCreditFactory,
    private customerStoreCredit: DaffCustomerStoreCreditInMemoryBackendService,
    private cart: DaffInMemoryBackendCartRootService,
  ) {}

  /**
   * Automatically called as part of the InMemoryDbService to parse incoming urls to match the InMemory backend urls.
   *
   * @param url initial url
   * @param utils utility to parse url
   * @returns ParsedRequestUrl
   * @docs-private
   */
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    return utils.parseRequestUrl(url);
  }

  /**
   * @docs-private
   */
  createDb(): any {
    return {};
  }

  /**
   * Gets the cart's store credit.
   *
   * @param reqInfo request object
   * @returns An http response object
   */
  post(reqInfo: RequestInfo) {
    const cart = this.getCart(reqInfo);
    const { balance } = this.customerStoreCredit.storeCredit;
    const grandTotal = cart?.totals.find(t => t.name === DaffCartTotalTypeEnum.grandTotal);
    if (grandTotal) {
      const appliedBalance = Math.min(balance, grandTotal.value);
      grandTotal.value -= appliedBalance;
      cart.appliedStoreCredit = appliedBalance;
    }

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: cart,
    }));
  }

  delete(reqInfo: RequestInfo) {
    const cart = this.getCart(reqInfo);
    const grandTotal = cart?.totals.find(t => t.name === DaffCartTotalTypeEnum.grandTotal);
    if (grandTotal) {
      grandTotal.value += cart.appliedStoreCredit || 0;
      cart.appliedStoreCredit = 0;
    }

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: cart,
    }));
  }

  private getCart(reqInfo: RequestInfo): DaffCartWithStoreCredit {
    return reqInfo.utils.findById<DaffCartWithStoreCredit>(<DaffCartWithStoreCredit[]>this.cart.carts, reqInfo.id);
  }
}
