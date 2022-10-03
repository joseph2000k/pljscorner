import { gql } from "@apollo/client";

const CREATE_CATEGORY = gql`
  mutation AddCategory($categoryInput: CategoryInput) {
    addCategory(categoryInput: $categoryInput) {
      _id
      categoryName
    }
  }
`;

export { CREATE_CATEGORY };
