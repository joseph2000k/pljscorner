import { gql } from "@apollo/client";

const ITEM_DETAILS = gql`
  fragment ItemDetails on Item {
    _id
    name
    price
    barcode
    cost
    sku
    stock
    image
  }
`;

export { ITEM_DETAILS };
