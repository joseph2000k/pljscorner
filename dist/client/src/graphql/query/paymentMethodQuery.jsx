"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_PAYMENT_METHOD = void 0;
const client_1 = require("@apollo/client");
const GET_PAYMENT_METHOD = (0, client_1.gql) `
  query PaymentMethod($paymentMethod: String) {
    paymentMethod(paymentMethod: $paymentMethod) {
      _id
      name
    }
  }
`;
exports.GET_PAYMENT_METHOD = GET_PAYMENT_METHOD;
