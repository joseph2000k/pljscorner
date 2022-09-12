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

export { GET_RECEIPTS };
