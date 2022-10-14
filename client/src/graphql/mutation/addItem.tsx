import { gql } from "@apollo/client";

const ADD_ITEM = gql`
  mutation addItem($itemInput: ItemInput) {
    addItem(itemInput: $itemInput) {
      _id
      name
      price
      cost
      sku
      stock
      image
      category {
        categoryName
      }
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($itemId: ID!, $itemInput: ItemInput) {
    updateItem(itemId: $itemId, itemInput: $itemInput) {
      _id
      name
      price
      cost
      sku
      stock
      image
      barcode
      category {
        _id
        categoryName
      }
    }
  }
`;

export { ADD_ITEM, UPDATE_ITEM };
