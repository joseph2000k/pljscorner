import { gql } from "@apollo/client";

const GET_RECEIPTS = gql`
  query Receipts {
    receipts {
      _id
      total
      cash
      change
      receiptnumber
      time
      paymentmethod {
        name
      }
      items {
        itemId
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

export { GET_RECEIPTS, GET_RECEIPT };
