"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CATEGORIES = void 0;
const client_1 = require("@apollo/client");
const GET_CATEGORIES = (0, client_1.gql) `
query GetCategory {
  getCategory {
    _id
    categoryName
  }
}
`;
exports.GET_CATEGORIES = GET_CATEGORIES;
