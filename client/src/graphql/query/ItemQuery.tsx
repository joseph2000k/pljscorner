import { gql } from "@apollo/client";
import { ITEM_DETAILS } from "../fragments";

const GET_ALL_ITEMS = gql`
  ${ITEM_DETAILS}
query GetItems {
  getItems {
    ...ItemDetails
  }
}`

const GET_ITEMS_BY_CATEGORY= gql`
  ${ITEM_DETAILS}
query GetItemsByCategory($categoryId: ID!) {
  getItemsByCategory(categoryId: $categoryId) {
    ...ItemDetails
  }
}`

export {GET_ALL_ITEMS, GET_ITEMS_BY_CATEGORY};