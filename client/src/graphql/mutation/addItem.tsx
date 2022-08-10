import {gql} from '@apollo/client';

const ADD_ITEM = gql`
  mutation Mutation($itemInput: ItemInput) {
  addItem(itemInput: $itemInput) {
    name
    price
    cost
    sku
    stock
  }
}
`

export {ADD_ITEM};

