"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OF_ITEMS = exports.GET_TOTAL = exports.GET_CART = void 0;
const client_1 = require("@apollo/client");
const GET_CART = (0, client_1.gql) `
  query GetCart($userId: ID!) {
    getCart(userId: $userId) {
      _id
      user {
        _id
      }
      items {
        _id
        itemId
        item
        quantity
        price
        discount
      }
    }
  }
`;
exports.GET_CART = GET_CART;
const GET_TOTAL = (0, client_1.gql) `
  query TotalPrice {
    getTotal
  }
`;
exports.GET_TOTAL = GET_TOTAL;
const NO_OF_ITEMS = (0, client_1.gql) `
  query NumberofItemsInCart {
    numberOfItemsInCart
  }
`;
exports.NO_OF_ITEMS = NO_OF_ITEMS;
