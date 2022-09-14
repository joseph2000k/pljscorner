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

export { ADD_TO_CART, REMOVE_FROM_CART };
