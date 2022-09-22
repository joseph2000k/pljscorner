import { gql } from "@apollo/client";

const GET_DISCOUNT = gql`
  query GetSMDiscounts {
    getSMDiscounts {
      items {
        _id
        name
        price
        cost
        sku
        stock
        image
      }
      title
      buy
      saveValue
      _id
      activated
    }
  }
`;

export { GET_DISCOUNT };
