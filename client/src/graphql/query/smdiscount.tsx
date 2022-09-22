import { gql } from "@apollo/client";

const GET_DISCOUNT = gql`
  query GetSMDiscounts {
    getSMDiscounts {
      items {
        name
        image
        _id
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
