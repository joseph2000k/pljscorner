import { gql } from "@apollo/client";

const ITEM_DETAILS = gql`
    fragment ItemDetails on Item {
        _id
        name
        price
        cost
        sku
        stock
    }
`;

export { ITEM_DETAILS };