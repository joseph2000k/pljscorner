"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_ITEM = void 0;
const client_1 = require("@apollo/client");
const ADD_ITEM = (0, client_1.gql) `
  mutation addItem($itemInput: ItemInput) {
    addItem(itemInput: $itemInput) {
      _id
      name
      price
      cost
      sku
      stock
      image
      category {
        categoryName
      }
    }
  }
`;
exports.ADD_ITEM = ADD_ITEM;
