import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';

import {
  daffBuildFragmentNameSpread,
  daffBuildFragmentDefinition,
} from '@daffodil/core/graphql';

import { cartFragment } from '../fragments/public_api';
import { MagentoUpdateAddressWithEmailResponse } from './response.type';
import { MagentoCartUpdateAddressWithEmailQueryVariables } from './variables.type';

/**
 * Update the shipping and billing address of the cart.
 * At the time of writing, Magento 2 processes compound queries in the order they are defined.
 * We rely on this fact and only use the return of the last query.
 * This helps us keep query complexity down and save some server CPU cycles.
 * Driver behavior is not guaranteed if Magento no longer processes compound queries in the order they are defined.
 */
export const updateAddressWithEmail = (extraCartFragments: DocumentNode[] = []) => gql<MagentoUpdateAddressWithEmailResponse, MagentoCartUpdateAddressWithEmailQueryVariables>`
  mutation MagentoUpdateAddressWithEmail($cartId: String!, $email: String!, $address: CartAddressInput, $addressId: Int) {
    setBillingAddressOnCart(input: {
      cart_id: $cartId
      billing_address: {
        address: $address,
        customer_address_id: $addressId
      }
    }) {
      cart {
        id
      }
    }
    setShippingAddressesOnCart(input: {
      cart_id: $cartId
      shipping_addresses: [{
        address: $address,
        customer_address_id: $addressId
      }]
    }) {
      cart {
        id
      }
    }
    setGuestEmailOnCart(input: {
      cart_id: $cartId,
      email: $email
    }) {
      cart {
        ...cart
        ${daffBuildFragmentNameSpread(...extraCartFragments)}
      }
    }
  }
  ${cartFragment}
  ${daffBuildFragmentDefinition(...extraCartFragments)}
`;
