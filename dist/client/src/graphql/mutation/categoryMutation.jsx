"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_CATEGORY = void 0;
const client_1 = require("@apollo/client");
const CREATE_CATEGORY = (0, client_1.gql) `
  mutation AddCategory($categoryInput: CategoryInput) {
    addCategory(categoryInput: $categoryInput) {
      _id
      categoryName
    }
  }
`;
exports.CREATE_CATEGORY = CREATE_CATEGORY;
