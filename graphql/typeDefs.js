const { gql } = require('apollo-server');

module.exports = gql`
  type Product {
    _id: ID!
    name: String
    price: Float
    description: String
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

  type Query {
    getProducts: [Product]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
