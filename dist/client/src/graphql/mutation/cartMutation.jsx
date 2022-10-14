"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_FROM_CART_WITH_DISCOUNT = exports.ADD_TO_CART_WITH_DISCOUNT = exports.REMOVE_FROM_CART = exports.ADD_TO_CART = void 0;
const client_1 = require("@apollo/client");
const ADD_TO_CART = (0, client_1.gql) `
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
exports.ADD_TO_CART = ADD_TO_CART;
const ADD_TO_CART_WITH_DISCOUNT = (0, client_1.gql) `
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
exports.ADD_TO_CART_WITH_DISCOUNT = ADD_TO_CART_WITH_DISCOUNT;
const REMOVE_FROM_CART = (0, client_1.gql) `
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
exports.REMOVE_FROM_CART = REMOVE_FROM_CART;
const REMOVE_FROM_CART_WITH_DISCOUNT = (0, client_1.gql) `
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
exports.REMOVE_FROM_CART_WITH_DISCOUNT = REMOVE_FROM_CART_WITH_DISCOUNT;
