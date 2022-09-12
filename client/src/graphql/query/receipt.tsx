import { gql } from "@apollo/client";

const GET_RECEIPTS = gql`
  query Cashier {
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

const GET_RECEIPT = gql`
  query Receipt($receiptId: ID!) {
    receipt(receiptId: $receiptId) {
      total
      cash
      change
      receiptnumber
      items {
        item
        quantity
        price
      }
      time
    }
  }
`;

export { GET_RECEIPTS, GET_RECEIPT };
