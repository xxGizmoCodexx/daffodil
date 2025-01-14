import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';

import {
  daffBuildFragmentNameSpread,
  daffBuildFragmentDefinition,
} from '@daffodil/core/graphql';

import { cartFragment } from '../fragments/public_api';
import { MagentoRemoveCartItemResponse } from './response.type';
import { MagentoCartRemoveItemQueryVariables } from './variables.type';

export const removeCartItem = (extraCartFragments: DocumentNode[] = []) => gql<MagentoRemoveCartItemResponse, MagentoCartRemoveItemQueryVariables>`
  mutation MagentoRemoveCartItem($cartId: String!, $itemId: Int!) {
    removeItemFromCart(input: {
      cart_id: $cartId,
      cart_item_id: $itemId
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
