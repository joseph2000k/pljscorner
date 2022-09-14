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

export { GET_CART, GET_TOTAL };
