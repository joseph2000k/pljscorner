import { gql } from "@apollo/client";

const GET_CART = gql`
  query GetCart($userId: ID!) {
    getCart(userId: $userId) {
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

const GET_TOTAL = gql`
  query TotalPrice {
    getTotal
  }
`;

const NO_OF_ITEMS = gql`
  query NumberofItemsInCart {
    numberOfItemsInCart
  }
`;

export { GET_CART, GET_TOTAL, NO_OF_ITEMS };
