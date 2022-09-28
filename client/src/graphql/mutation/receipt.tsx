import { gql } from "@apollo/client";

const RECEIPT = gql`
  mutation Receipt($receiptInput: ReceiptInput) {
    receipt(receiptInput: $receiptInput) {
      total
      cash
      change
    }
  }
`;

export { RECEIPT };
