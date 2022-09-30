"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_DISCOUNT = void 0;
const client_1 = require("@apollo/client");
const GET_DISCOUNT = (0, client_1.gql) `
  query GetSMDiscounts {
    getSMDiscounts {
      items {
        _id
        name
        price
        cost
        sku
        stock
        image
      }
      title
      buy
      saveValue
      _id
      activated
    }
  }
`;
exports.GET_DISCOUNT = GET_DISCOUNT;
