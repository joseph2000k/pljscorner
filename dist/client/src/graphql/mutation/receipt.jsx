"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECEIPT = void 0;
const client_1 = require("@apollo/client");
const RECEIPT = (0, client_1.gql) `
  mutation Receipt($receiptInput: ReceiptInput) {
    receipt(receiptInput: $receiptInput) {
      total
      cash
      change
    }
  }
`;
exports.RECEIPT = RECEIPT;
