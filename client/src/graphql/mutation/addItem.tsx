import {gql} from '@apollo/client';

const ADD_ITEM = gql`
  mutation Mutation($itemInput: ItemInput) {
  addItem(itemInput: $itemInput) {
    _id
    name
    price
    cost
    sku
    stock
    image
    category{
      categoryName
    }
  }
}
`

export {ADD_ITEM};

