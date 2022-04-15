import {gql} from 'apollo-server';

export const typeDefs = gql`
  type Product {
    _id: ID!
    name: String
    price: Float
    description: String
    sku: String
    user: User
  }

  type Item {
    _id: ID!
    productId: Product
    quantity: Int
    supplier: String
    batchdate: String
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
    password: String! @constraint(minLength: 6)
    email: String! @constraint(minLength: 5, format: "email")
  }

  input ProductInput {
    name: String
    price: Float
    description: String
    sku: String
  }

  type Query {
    getProducts: [Product]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    addProduct(productInput: ProductInput): Product!
  }
`;
