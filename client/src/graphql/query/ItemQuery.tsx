import { gql } from "@apollo/client";
import { ITEM_DETAILS } from "../fragments";

const GET_ALL_ITEMS = gql`
  ${ITEM_DETAILS}
query GetItems {
  getItems {
    ...ItemDetails
    category {
      categoryName
    }
  }
}`

const GET_ITEMS_BY_CATEGORY= gql`
  ${ITEM_DETAILS}
query GetItemsByCategory($categoryId: ID!) {
  getItemsByCategory(categoryId: $categoryId) {
    ...ItemDetails
    category {
      categoryName
    }
  }
}`

export {GET_ALL_ITEMS, GET_ITEMS_BY_CATEGORY};