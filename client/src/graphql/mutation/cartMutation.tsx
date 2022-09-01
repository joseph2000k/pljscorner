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

export { ADD_TO_CART };
