import { gql } from "@apollo/client";

const GET_ALL_ITEMS = gql`
query GetItems {
  getItems {
    _id
    name
    price
    stock
    sku
  }
}`

const GET_ITEMS_BY_CATEGORY= gql`
query GetItemsByCategory($categoryId: ID!) {
  getItemsByCategory(categoryId: $categoryId) {
    _id
    name
    price
    sku
    stock
  }
}`

export {GET_ALL_ITEMS, GET_ITEMS_BY_CATEGORY};