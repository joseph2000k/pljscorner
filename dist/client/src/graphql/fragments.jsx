"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM_DETAILS = void 0;
const client_1 = require("@apollo/client");
const ITEM_DETAILS = (0, client_1.gql) `
  fragment ItemDetails on Item {
    _id
    name
    price
    cost
    sku
    stock
    image
  }
`;
exports.ITEM_DETAILS = ITEM_DETAILS;
