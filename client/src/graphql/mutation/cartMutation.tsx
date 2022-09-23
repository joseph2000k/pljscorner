import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
  mutation AddToCart($cartInput: ID) {
    addToCart(cartInput: $cartInput) {
      _id
      user {
        _id
      }
      items {
        itemId
        item
        quantity
        price
      }
    }
  }
`;

const ADD_TO_CART_WITH_DISCOUNT = gql`
  mutation AddDiscountedItemToCart($item: ID!) {
    addDiscountedItemToCart(item: $item) {
      _id
      user {
        _id
      }
      items {
        itemId
        item
        quantity
        price
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartInput: ID) {
    removeFromCart(cartInput: $cartInput) {
      _id
      user {
        _id
      }
      items {
        itemId
        item
        quantity
        price
      }
    }
  }
`;

const REMOVE_FROM_CART_WITH_DISCOUNT = gql`
  mutation RemoveFromCartDiscount($cartInput: ID) {
    removeFromCartDiscount(cartInput: $cartInput) {
      _id
      user {
        _id
      }
      items {
        itemId
        item
        quantity
        price
      }
    }
  }
`;

export {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_CART_WITH_DISCOUNT,
  REMOVE_FROM_CART_WITH_DISCOUNT,
};
