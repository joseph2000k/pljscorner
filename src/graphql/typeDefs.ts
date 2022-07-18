const { gql } = require("apollo-server");

module.exports = gql`
  type Category {
    _id: ID!
    name: String
  }

  type Item {
    _id: ID!
    category: Category
    price: Float
    cost: Float
    sku: String
    barcode: String
    stock: Int
    image: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  input CategoryInput {
    name: String
  }

  type Query {
    getCategory: [Category]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    addCategory(categoryInput: CategoryInput): Category!
  }
`;