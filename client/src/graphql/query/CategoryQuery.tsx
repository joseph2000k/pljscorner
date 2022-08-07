import {gql} from '@apollo/client';

const GET_CATEGORIES = gql`
query GetCategory {
  getCategory {
    _id
    name
  }
}
`

export {GET_CATEGORIES};