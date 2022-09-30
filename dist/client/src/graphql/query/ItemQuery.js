"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ITEMS_BY_CATEGORY = exports.GET_ALL_ITEMS = void 0;
const client_1 = require("@apollo/client");
const fragments_1 = require("../fragments");
const GET_ALL_ITEMS = (0, client_1.gql) `
  ${fragments_1.ITEM_DETAILS}
query GetItems {
  getItems {
    ...ItemDetails
    category {
      categoryName
    }
  }
}`;
exports.GET_ALL_ITEMS = GET_ALL_ITEMS;
const GET_ITEMS_BY_CATEGORY = (0, client_1.gql) `
  ${fragments_1.ITEM_DETAILS}
query GetItemsByCategory($categoryId: ID!) {
  getItemsByCategory(categoryId: $categoryId) {
    ...ItemDetails
    category {
      categoryName
    }
  }
}`;
exports.GET_ITEMS_BY_CATEGORY = GET_ITEMS_BY_CATEGORY;
