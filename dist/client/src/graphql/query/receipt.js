"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_RECEIPT = exports.GET_RECEIPTS = void 0;
const client_1 = require("@apollo/client");
const GET_RECEIPTS = (0, client_1.gql) `
  query Receipts {
    receipts {
      _id
      total
      cash
      change
      receiptnumber
      time
      items {
        item
        quantity
        price
      }
      cashier {
        username
      }
    }
  }
`;
exports.GET_RECEIPTS = GET_RECEIPTS;
const GET_RECEIPT = (0, client_1.gql) `
  query Receipt($receiptId: ID!) {
    receipt(receiptId: $receiptId) {
      total
      cash
      change
      receiptnumber
      cashier {
        username
      }
      items {
        itemId
        item
        quantity
        price
      }
      paymentmethod {
        name
      }
      time
    }
  }
`;
exports.GET_RECEIPT = GET_RECEIPT;
